'use client'

import React, { useMemo } from 'react'
import { useGetCategoriesQuery } from '~/hooks/data/categories.data'
import { ICategory } from '~/models/categories.module'
import Category from './category'

function Categories() {
  const { data: categoriesData } = useGetCategoriesQuery()
  const categories = (categoriesData?.result?.categories as ICategory[]) || null
  const totalDishes = useMemo(() => {
    return categories?.reduce((total, category) => total + category.totalProducts, 0) || 0
  }, [categoriesData])

  return (
    <div>
      <section className='flex flex-wrap gap-4'>
        <Category className='min-w-32' amount={totalDishes} name='All' />
        {categories &&
          categories.map(function (category, index: number) {
            console.log(+category.totalProducts)
            return (
              <Category
                className='min-w-32'
                _id={category._id}
                amount={+category.totalProducts}
                key={index}
                name={category.name}
              />
            )
          })}
      </section>
    </div>
  )
}

export default Categories
