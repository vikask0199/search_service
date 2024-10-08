import { useEffect, useState } from 'react';
import { useGetAllCategoryQuery } from '../../features/categorySlice/categorySlice';
import { useLazyGetStoreByCityAndCategoryQuery } from '../../features/storeSlice/storeSlice';
import ReadCompleteAddress from '../searchPage/ReadCompleteAddress';
import StarRating from '../searchPage/StarRating';
import { MdSubdirectoryArrowRight } from 'react-icons/md';
import { IoCall } from 'react-icons/io5';
import { SiGmail } from 'react-icons/si';
import { IoLogoWhatsapp } from 'react-icons/io';
import { toast } from 'react-toastify';
import CircularProgress from '@mui/material/CircularProgress';

// Define the Store type
interface Store {
  logo: string;
  name: string;
  rating: number[] | number;
  completeAddress: string;
  phone: string;
  email: string;
  whatsApp: string;
  locationUrl: string;
  createdAt: string;
}

const HomeHeader = () => {
  const getAllCategory = useGetAllCategoryQuery(undefined);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [city, setCity] = useState("");
  const [stores, setStores] = useState<Store[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [getStoresByCityAndCategory] = useLazyGetStoreByCityAndCategoryQuery();
  const [isSearching, setIsSearching] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  const handleCategoryChange = (e: any) => {
    setSelectedCategory(e.target.value);
  };

  const handleCityChange = (e: any) => {
    const city = e.target.value.toLowerCase();
    setCity(city);
  };

  const handleGetSearchResult = async () => {
    setIsSearching(true)
    setIsLoading(true)
    if (selectedCategory && city) {
      setPage(1);
      try {
        const result = await getStoresByCityAndCategory({ category: selectedCategory, city, page: 1 }).unwrap();
        setStores(result.data.stores || []);
        setTotalPages(result.data.totalPages || 1);
      } catch (error) {
        setStores([]);
        setTotalPages(1);
        setIsSearching(false)
        setIsLoading(false)
      }
    } else {
      setIsSearching(false)
      toast.info("Please select category and city")
    }
    setIsSearching(false)
    setIsLoading(false)
  };

  const handleLoadMore = async () => {
    const nextPage = page + 1;
    if (nextPage > totalPages) return;
    try {
      const result = await getStoresByCityAndCategory({ category: selectedCategory, city, page: nextPage }).unwrap();
      setStores((prevStores) => [...prevStores, ...(result.data.stores || [])]);
      setPage(nextPage);
    } catch (error) {
      toast.info("Error loading more stores")
    }
  };

  const handleOpenWhatsApp = (wNumber: string) => {
    const whatsappUrl = `https://wa.me/${wNumber}`;
    window.open(whatsappUrl, "_blank");
  };

  const handleMakeCall = (callNumber: string) => {
    const callUrl = `tel:${callNumber}`;
    window.location.href = callUrl;
  };

  const handleSendEmail = (email: string) => {
    const mailtoUrl = `mailto:${email}`;
    window.location.href = mailtoUrl;
  };

  const handleOpenDirection = (item: string) => {
    const address = encodeURIComponent(item);
    const locationUrl = `https://www.google.com/maps/dir/?api=1&destination=${address}`;
    window.open(locationUrl, "_blank");
  };

  useEffect(() => {
    const eventSource = new EventSource('https://search-service.onrender.com/store/stream-stores');

    eventSource.onopen = () => {
      console.log('Connection to server opened.');
    };

    eventSource.onmessage = (event) => {
      try {
        const parsedData = JSON.parse(event.data);
        if (Array.isArray(parsedData)) {
          setStores((prevStores) => {
            const updatedStores = [...parsedData, ...prevStores];
            return updatedStores.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
          });
        } else if (typeof parsedData === 'object' && parsedData !== null) {
          setStores((prevStores) => {
            const updatedStores = [parsedData, ...prevStores];
            return updatedStores.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
          });
        } else {
          console.error('Received data is neither an array nor an object:', parsedData);
        }
        setIsLoading(false);
      } catch (error) {
        console.error('Error parsing event data:', error);
      }
    };

    eventSource.onerror = (error) => {
      console.error('EventSource failed:', error);
      toast.info('EventSource failed during load the data');
      eventSource.close();
    };

    // Cleanup on component unmount
    return () => {
      console.log('Closing EventSource connection.');
      eventSource.close();
    };
  }, []);

  return (
    <div className="flex items-center justify-center flex-col ">
      <div className="flex-grow p-4 bg-opacity-60 rounded-md m-4 w-[95%] md:w-[70%]">
        <div className="flex-grow p-4 rounded-md flex flex-wrap gap-5 bg-gray-200">
          <input
            type="text"
            value={city}
            onChange={handleCityChange}
            className="flex-grow h-10 outline-none focus:border-cyan-500 border-2 indent-1"
            placeholder="Enter City Name"
          />
          <select name="category" value={selectedCategory} onChange={handleCategoryChange} className="h-10 bg-white flex-grow p-1 cursor-pointer outline-none focus:border-cyan-500 border-2">
            <option value="">Select a category</option>
            {
              getAllCategory && getAllCategory?.data?.data?.length > 0 ? (
                getAllCategory?.data?.data?.map((item: any) => (
                  <option key={item._id} value={item._id}>{item.name}</option>
                ))
              ) : (
                <option>No category found</option>
              )
            }
          </select>
          <button
            onClick={handleGetSearchResult}
            className="flex-grow w-32 h-10 bg-cyan-500 cursor-pointer text-white hover:bg-white hover:text-cyan-500 duration-300 border border-cyan-500"
          >
            {
              isSearching ? (
                <div className=''>
                  <CircularProgress size={30}/>
                </div>
              ) : "Search"
            }
          </button>
        </div>
      </div>
      <div className="flex items-center py-10 flex-col gap-5 md:w-[70%]">
        {
          stores.length > 0 ? (
            stores.map((store, index) => (
              <div key={index} className="flex items-center py-10 flex-col gap-5 w-full">
                <div className="p-6 shadow-md flex flex-col gap-5 bg-white w-[95%]">
                  <div className="flex gap-2 md:border w-full md:flex-row flex-col">
                    <div className="md:w-[350px] md:h-[200px]">
                      <img className="w-full h-full" src={store.logo} alt="" />
                    </div>
                    <div className="md:w-[99%] md:p-0 p-2">
                      <p className="font-bold md:text-2xl uppercase">{store.name}</p>
                      <div>
                        <p className="font-bold">User Review</p>
                        <StarRating ratings={store.rating} />
                      </div>
                      <ReadCompleteAddress text={store.completeAddress} maxChar={100} />
                      <p className="pt-2"><span className="font-bold">Contact:-</span> {store.phone}</p>
                      <p><span className="font-bold">Email:-</span> {store.email}</p>
                    </div>
                  </div>
                  <div className="flex justify-between gap-2 flex-wrap">
                    <button className="py-1 rounded-sm cursor-pointer w-32 flex items-center justify-center bg-blue-700 text-white hover:text-blue-700 hover:bg-white duration-300 border border-blue-700" onClick={() => handleOpenDirection(store.locationUrl)}><span className="flex items-center gap-1  "><MdSubdirectoryArrowRight className="text-xl" /> Direction</span></button>
                    <button className="py-1 rounded-sm cursor-pointer w-32 flex items-center justify-center bg-red-700 text-white hover:text-red-700 hover:bg-white duration-300 border border-red-700" onClick={() => handleMakeCall(store.phone)}><span className="flex items-center gap-1  "><IoCall className="text-xl" /> Call Now</span></button>
                    <button className="py-1 rounded-sm cursor-pointer w-32 flex items-center justify-center bg-violet-700 text-white hover:text-violet-700 hover:bg-white duration-300 border border-violet-700" onClick={() => handleSendEmail(store.email)}><span className="flex items-center gap-1  "><SiGmail className="text-xl" /> Send Enquiry</span></button>
                    <button className="py-1 rounded-sm cursor-pointer w-32 flex items-center justify-center bg-green-700 text-white hover:text-green-700 hover:bg-white duration-300 border border-green-700" onClick={() => handleOpenWhatsApp(store.whatsApp)}><span className="flex items-center gap-1  "><IoLogoWhatsapp className="text-xl" /> Chat</span></button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div>
              {
                isLoading ? (<CircularProgress />) : ("No stores found")
              }
            </div>
          )
        }
        {stores.length > 0 && page < totalPages && (
          <button
            onClick={handleLoadMore}
            className="px-4 py-2 bg-blue-500 text-white rounded-md"
          >
            Load More
          </button>
        )}
      </div>
    </div>
  );
};

export default HomeHeader;
