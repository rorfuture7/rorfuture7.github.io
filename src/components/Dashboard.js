import React, { useEffect, useState } from 'react';
import { NEWS_API_KEY } from "../config";
import axios from 'axios';
import InfiniteScroll from 'react-infinite-scroll-component';
import NewsItems from './NewsItems';
import Spinner from './Spinner';
import LoadingBar from 'react-top-loading-bar'

const Dashboard = ({ country = 'us', category = 'general', pageSize = 8 }) => {
  const [articles, setArticles] = useState([]); // State to hold news data
  const [page, setPage] = useState(1); // Current page for pagination
  const [progress, setProgress] = useState(0);
  const [totalResults, setTotalResults] = useState(0); // Total number of results
  const [error, setError] = useState(''); // State to hold any error messages
  const [isLoading, setisLoading] = useState(false);

  const fetchNews = async (currentPage = 1) => {
    setisLoading(true);
    setProgress(10);
    try {
      const response = await axios.get(`https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=${NEWS_API_KEY}&page=${currentPage}&pageSize=${pageSize}`);
      setArticles((prevArticles) => [...prevArticles, ...response.data.articles]); // Append new articles to the existing ones
      setTotalResults(response.data.totalResults); // Set the total number of articles
      setError('');
      setProgress(70);
      setisLoading(false);
      setProgress(100);
    } catch (error) {
      setError('Failed to fetch news');
      setProgress(100);
    }
  };

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  useEffect(() => {
    fetchNews(); // Fetch news on initial load
  }, [country, category, pageSize]);

  // Fetch more articles when the user scrolls down
  const fetchMoreData = () => {
    setPage(page + 1); // Increment page number
    fetchNews(page + 1); // Fetch new articles for the next page
  };
  console.log(`********************8 ${progress}`)
  return (
    <div>
      <LoadingBar
        color='#f11946'
        height={3}
        progress={progress}
      />
      <h1 className="text-center my-4">NewsMonkey - Top {capitalizeFirstLetter(category)} Headlines</h1>
      {error && <p>{error}</p>} {/* Display error if any */}
      {isLoading && <Spinner />}
        <InfiniteScroll
          dataLength={articles.length} // This is the number of items loaded so far
          next={fetchMoreData} // Method to load more items
          hasMore={articles.length < totalResults} // Check if there are more articles to load
          // loader={<h4>Loading...</h4>} // Loader displayed while more items are being fetched
          loader={articles.length < totalResults && <Spinner />}
        >
          <div className="container">
            <div className="row">
              {articles.map((element, index) => (
                <div key={`${element.url}-${index}`} className="col-md-4 my-1">
                  <NewsItems 
                    title={element.title || ""} 
                    description={element.description ? element.description.slice(0, 88) : ""} 
                    imageUrl={element.urlToImage || "https://blog.roboflow.com/content/images/size/w1200/2023/03/launch-new-api-cli.jpg"} 
                    newsUrl={element.url} 
                    author={element.author} 
                    data={element.publishedAt} 
                    source={element.source.name}
                  />
                </div>
              ))}
            </div>
          </div>
        </InfiniteScroll>
    </div>
  );
};

export default Dashboard;
