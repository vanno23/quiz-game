import React, { useState, useCallback, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Loading from '../Loading/Loading';
import { CategoryTypes, CategoryApiResponse, CategoryProps, } from './CategoryTypes';
import { BsChevronDown } from 'react-icons/bs';


function Category({ setCategoryApi, setCategoryTitle }: CategoryProps) {

  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [categoryData, setCategoryData] = useState<CategoryTypes[]>();
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [totalCategories, setTotalCategories] = useState(24);
  const [dropDown, setDropDown] = useState(9);


  const getData = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('https://opentdb.com/api_category.php');
      const data: CategoryApiResponse = await response.json();
      setCategoryData(data.trivia_categories.slice(0, dropDown));
    } catch (error) {
      setErrorMessage('Error fetching category data.');
    }
    setIsLoading(false);
  }

  useEffect(() => {
    getData();
  }, [dropDown]);

  const handleDropDownClick = () => {
    const nextDropDown = dropDown + 9;
    if (nextDropDown <= totalCategories) {
      setDropDown(nextDropDown);
    } else {
      const rest = totalCategories - nextDropDown;
      setDropDown(nextDropDown + rest);
    }
  }

  const setActive = useCallback((index: number, name:string) => {
    setActiveIndex(index);
    setCategoryApi(index);
    setCategoryTitle(name);
  }, [categoryData]);



  return (
    <>
      {isLoading ? <Loading /> : (
        <div className='category'>
          <h1 className='categoryTitle'>Choose Category: </h1>
          {errorMessage ? (
            <div>{errorMessage}</div>
          ) : (
            <>
              <div className='categoryContainer'>
                {categoryData?.map((item) => {
                  const { id, name } = item;
                  return (
                    <div key={id}>
                      <button
                        className={activeIndex === id ? 'active' : ''}
                        onClick={() => setActive(id, name)}
                      >
                        {name}
                      </button>
                    </div>
                  )
                })}
              </div>

                <div className='dropDown'>
                  <button onClick={handleDropDownClick}><BsChevronDown /></button>
                </div>

              <div className='nextContainer'>
                {activeIndex ? (
                  <Link to="/difficulty" className='next'>Next</Link>
                ) : (
                  <span className='next'>Next</span>
                )}
              </div>

            </>
          )}
        </div>
      )}
    </>
  )
}

export default Category;