import axios from "axios";
import { useEffect, useState } from "react";

export default function ChuckGenerator() {
  const [post, setPost] = useState<string | null>(null);

  const fetchPost = async () => {
    try {
      const response = await axios("https://api.chucknorris.io/jokes/random");
      //update the state
      setPost(response.data.value);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchPost();
  }, []);

  return (
    <div>
      <p> {post} </p>
      <button type="button" onClick={fetchPost}>
        get new joke
      </button>
    </div>
  );
}
