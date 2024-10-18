import { useQuery } from "react-query";

// Function to fetch questions
const fetchQuestions = async () => {
  try {
    const res = await fetch(
      'https://krish-2512.github.io/api/questions-2.json'
    );
    
    if (!res.ok) {
      throw new Error('Failed to fetch data'); // Handle non-OK response status
    }
    
    const data = await res.json(); 
    // console.log(data);// Corrected, removed unnecessary argument

    if (Array.isArray(data)) {
      return data; // If data is an array, return it
    } else {
      throw new Error('Data is not an array'); // Handle unexpected data format
    }
  } catch (e) {
    // Pass more specific error information
    throw new Error(`Something went wrong while fetching data: ${e.message}`);
  }
};

// Custom hook to use the query
export const useData = () => {
  return useQuery('questions', fetchQuestions);
};