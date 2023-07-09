import React, { useState } from "react";
import { useAppDispatch } from "../../hooks/reduxHooks";
import { Link } from "react-router-dom";
import { getSearch } from "../../store/userSlice/postsSlice";
import { getSearchName } from "../../store/userSlice/searchSlice";
import { IBook } from "../../models/IBook";
import { IconSearch } from "../Icons/Icons";

const Search = (props: any) => {
  //Search Value
  const [value, setValue] = useState<string>("");
  const books = props.posts.searchName;
  const dispatch = useAppDispatch();

  //search recomend on change
  const changeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    dispatch(getSearchName(value));
  };

  //search click
  const handleClick = (e: React.MouseEvent<HTMLInputElement, MouseEvent>) => {
    dispatch(getSearch(value));
    props.posts.setSearching([]);
  };

  return (
    <>
      <div className="search">
        <form className="search_form">
          <div className="search_block">
            <input
              type="text"
              placeholder="search..."
              value={value}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                changeValue(e)
              }
              className="search_input"
            />
            <Link to={`/?search=${value}`}>
              <input
                type="submit"
                style={{ display: "none" }}
                onClick={(e: React.MouseEvent<HTMLInputElement, MouseEvent>) =>
                  handleClick(e)
                }
              />
              <i
                className="search_icon"
                onClick={(e: React.MouseEvent<HTMLInputElement, MouseEvent>) =>
                  handleClick(e)
                }
              >
                <IconSearch />
              </i>
            </Link>
          </div>
          <ul
            className="search_recomends"
            onClick={() => props.posts.setSearching([])}
          >
            {books.map((b: IBook) => (
              <Link key={b._id} to={`/Card/?id=${b._id}`}>
                <li className="search_recomend">{b.name}</li>
              </Link>
            ))}
          </ul>
        </form>
        
        <ul>
          <li >All</li>
        </ul>
      </div>
    </>
  );
};

export default Search;
