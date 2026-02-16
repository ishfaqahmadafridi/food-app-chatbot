import { assets } from '../../assets/frontend_assets/assets'


const Logo = () => {
  return (
    <>

          <div className="flex items-center gap-2 text-[#262626] cursor-pointer no-underline">
            <img className="logo-icon" src={assets.logo} alt="RestoBot Logo" />
          </div>
    </>
  )
}

export default Logo
