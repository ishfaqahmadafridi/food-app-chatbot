import React from 'react'
import MenuHeading from './MenuHeading'
import ExploreMenuList from './ExploreMenuList'
import { Separator } from '@/components/ui/separator';

const ExploreMenu = ({ category, setCategory }) => {
  return (
    <div className='w-full px-4 py-6 md:px-6 md:py-8 bg-white rounded-sm shadow-[0_2px_8px_rgba(0,0,0,0.1)]' id='explore-menu'>
      <MenuHeading />
      <ExploreMenuList category={category} setCategory={setCategory} />
      <Separator className="mt-2 mb-4" />
    </div>
  )
}

export default ExploreMenu
