import react from 'react';
import {Button} from '@shadcn/ui'
const Header = ()=>{
    return(
        <div className=' '>
            <h1 className='font-nicomoji mx-0 '>Ware<span className='text-blue-500'>View</span></h1>
            <Button className="mt-4">Click Me</Button>
           
        </div>
    )
}
export default Header