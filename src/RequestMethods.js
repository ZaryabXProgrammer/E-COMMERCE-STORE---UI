import axios from 'axios';

const BASE_URL = 'http://localhost:3003/api/'

// const TOKEN =
//   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1MmVjMjdhNWQ3YTc2YzNiODkzODY4OSIsImlzQWRtaW4iOmZhbHNlLCJpYXQiOjE2OTc1NjMzMDEsImV4cCI6MTY5NzgyMjUwMX0.fl7JTvTY7YRUjniNDdvgxkubyJ_JLjUBpnyG5pAAebk";

export const publicRequest = axios.create({
    baseURL: BASE_URL
})

export const userRequest = axios.create({
    baseURL: BASE_URL,
  
})