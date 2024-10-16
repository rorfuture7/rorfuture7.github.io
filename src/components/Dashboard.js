import React, { useEffect, useState } from 'react';
import { NEWS_API_KEY } from "../config";
import axios from 'axios';
import NewsItems from './NewsItems';

const Dashboard = ({ country = 'us', category = 'general', pageSize = 8, page = 1, setProgress = () => {} }) => {
  const [articles, setArticles] = useState([]); // State to hold news data
  const [error, setError] = useState(''); // State to hold any error messages

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get(`https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=${NEWS_API_KEY}&page=${page}&pageSize=${pageSize}`);
        setArticles(response.data.articles); // Store news articles in state
      } catch (error) {
        setError('Failed to fetch news'); // Handle any error
      }
    };

    fetchNews(); 
  }, []);

  return (
    <div>
      <h2>Dashboard</h2>
      {error && <p>{error}</p>} {/* Display error if any */}
      
      {articles.length > 0 ? (
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
      ) : (
        <p>Loading articles...</p>
      )}
    </div>
  );
};

export default Dashboard;
