import React, { useEffect } from 'react';
import {ScrollView} from 'react-native';
import BlogViewComponent from '../components/blog-view.component';
import { getAllBlog } from '../services';

export default function BlogsScreen() {
  const [blogs, setBlogs] = React.useState([]);

  useEffect(()=>{
    _getAllBlogs()
  },[])

  const _getAllBlogs = async () => {
    await getAllBlog().then(result=>setBlogs(result.data));
  }

  return (
    <ScrollView>
      {blogs.map((blog, index) => (
        <BlogViewComponent data={blog} key={index} />
      ))}
    </ScrollView>
  );
}
