import React from "react";
import Book from "../../models/Book";
import BookProps from "./components/BookProps";

const List: React.FC = () => {
  const books: Book[] = [
    {
      id: 1,
      title: "Book1",
      description: "Description for Book 1",
      originalPrice: 50000,
      price: 45000,
      imageUrl: "/images/books/1.jpg",
    },
    {
      id: 2,
      title: "Book2",
      description: "Description for Book 2",
      originalPrice: 50000,
      price: 45000,
      imageUrl: "/images/books/2.jpg",
    },
    {
      id: 1,
      title: "Book3",
      description: "Description for Book 3",
      originalPrice: 50000,
      price: 45000,
      imageUrl: "/images/books/3.jpg",
    },
    {
      id: 2,
      title: "Book4",
      description: "Description for Book 4",
      originalPrice: 50000,
      price: 45000,
      imageUrl: "/images/books/4.jpg",
    },
  ];
  return (
    <div className="container">
      <div className="row mt-4">
        {books.map((book) => (
          <BookProps key={book.id} book={book} />
        ))}
      </div>
    </div>
  );
};
export default List;
