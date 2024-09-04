import { useState, useEffect } from "react";

// Define the interfaces based on backend data structure
interface Auction {
  id: string;
  title: string;
  description: string;
  startingPrice: number;
  lotNumber: number;
  price: any;
  categoryId: number;
  status: string;
  category: string;
  sub_category: string;
  value: string;
  imageUrl: string | undefined;
  owner_id: number;
  endTime: string;
  createdAt: string;
  updatedAt: string;
  countryId: number; // Changed to countryId
  condition: string;
  period: string;
  typeOfSales: string;
  salesTypeId: number;
}

interface StatusTypeResponse {
  statusCode: number;
  statusType: string[];
}

interface Category {
  id: number;
  name: string;
}

interface CategoryListResponse {
  statusCode: number;
  categories: Category[];
}

interface Country {
  id: number;
  name: string;
}

interface CountryListResponse {
  statusCode: number;
  countries: Country[];
}

interface UseAuctionParams {
  categoryId?: number;
  countryId?: number;
  statusType?: string;
  condition?: string; // Added condition
  level?: string;
  priceRange?: { min: number; max: number };
  endTime?: string;
  updatedAt?: string;
  createdAt?: string;
  searchQuery?: string; // Add this line
  filterBy?: 'title' | 'description'; // Add this line
}

const useAuction = (params: UseAuctionParams = {}) => {
  const [auctions, setAuctions] = useState<Auction[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [statusTypes, setStatusTypes] = useState<string[]>([]);
  const [countries, setCountries] = useState<Country[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        let auctionUrl = "http://localhost:8001/products";

        // Construct the query string based on provided params
        const queryParams = new URLSearchParams();
        if (params.categoryId !== undefined) queryParams.append("categoryId", params.categoryId.toString());
        if (params.countryId !== undefined) queryParams.append("countryId", params.countryId.toString());
        if (params.statusType !== undefined) queryParams.append("statusType", params.statusType);
        if (params.level !== undefined) queryParams.append("level", params.level);
        if (params.priceRange) {
          queryParams.append("priceRangeMin", params.priceRange.min.toString());
          queryParams.append("priceRangeMax", params.priceRange.max.toString());
        }
        if (params.endTime !== undefined) queryParams.append("endTime", params.endTime);
        if (params.updatedAt !== undefined) queryParams.append("updatedAt", params.updatedAt);
        if (params.createdAt !== undefined) queryParams.append("createdAt", params.createdAt);
        if (params.condition !== undefined) queryParams.append("condition", params.condition); // Add condition to query
        if (params.searchQuery !== undefined) queryParams.append("searchQuery", params.searchQuery); // Add searchQuery to query
        if (params.filterBy !== undefined) queryParams.append("filterBy", params.filterBy); // Add filterBy to query
        
        if (queryParams.toString()) {
          auctionUrl = "http://localhost:8001/products/filter";
          auctionUrl += `?${queryParams.toString()}`;
        }

        const [
          auctionsResponse,
          categoryResponse,
          statusResponse,
          countryResponse,
        ] = await Promise.all([
          fetch(auctionUrl),
          fetch("http://localhost:8001/category/category-list"),
          fetch("http://localhost:8001/products/status-type"),
          fetch("http://localhost:8001/country/country-list"),
        ]);

        if (
          !auctionsResponse.ok ||
          !categoryResponse.ok ||
          !statusResponse.ok ||
          !countryResponse.ok
        ) {
          throw new Error("Network response was not ok");
        }

        const auctionsData = await auctionsResponse.json();
        const categoryData: CategoryListResponse = await categoryResponse.json();
        const statusData: StatusTypeResponse = await statusResponse.json();
        const countryData: CountryListResponse = await countryResponse.json();

        setAuctions(auctionsData);
        setCategories(categoryData.categories);
        setStatusTypes(statusData.statusType);
        setCountries(countryData.countries); // Updated to handle Country[]
        console.log("countryData:", countryData);
      } catch (error) {
        setError("Failed to fetch data");
      } finally {
        setLoading(false);
      }
    };

    // Call fetchData only if there's any filter applied
    if (Object.keys(params).length > 0) {
      fetchData();
    } else {
      setLoading(false);
    }
  }, [params.categoryId, params.countryId, params.statusType, params.level, params.priceRange, params.endTime, params.updatedAt, params.createdAt, params.condition, params.searchQuery, params.filterBy]); // Explicitly list dependencies

  return { auctions, categories, statusTypes, countries, loading, error };
};

export default useAuction;
