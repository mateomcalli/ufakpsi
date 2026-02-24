import Image from "next/image"
import Link from "next/link";
import { FaInstagram, FaLinkedinIn, FaTiktok } from "react-icons/fa";

const Footer = () => {
  const today = new Date();
  return (
    <section className="flex flex-col mx-auto h-48 mt-32 w-full px-8 lg:px-0 lg:w-4xl xl:w-6xl 2xl:w-7xl">
      <div className="h-px w-full bg-linear-to-r from-cream via-dblue to-cream" />
      <div className="flex px-4 justify-between items-end w-full">
        <div className="flex flex-col self-start w-fit h-fit">
          <Image
            src="/akp_blue_emblem.svg"
            width={100}
            height={100}
            alt="AKPsi emblem"
          />
          <p className="font-crimson">© {today.getFullYear()} Alpha Kappa Psi Fraternity</p>
        </div>
        <div className="relative flex flex-col pt-4 text-right">
          <div className="flex gap-4 relative pb-2">
            <Link 
              className='border text-gray-600 hover:text-dblue hover:opacity-100 transition-colors border-dblue h-fit p-2 rounded-lg'
              href="https://instagram.com/ufakpsi"
              rel="noopener noreferrer"
              target="_blank"
            >
              <FaInstagram size={32}/>
            </Link>
            <Link 
              className='border text-gray-600 hover:text-dblue hover:opacity-100 transition-colors border-dblue h-fit p-2 rounded-lg'
              href="https://instagram.com/ufakpsi"
              rel="noopener noreferrer"
              target="_blank"
            >
              <FaLinkedinIn size={32}/>
            </Link>
            <Link
              className='border text-gray-600 hover:text-dblue hover:opacity-100 transition-colors border-dblue h-fit p-2 rounded-lg'
              href="https://www.tiktok.com/@uf.akpsi"
              rel="noopener noreferrer"
              target="_blank"
            >
              <FaTiktok size={32}/>
            </Link>
          </div>
          <a target="_blank" rel="noopener noreferrer" href="https://github.com/mateomcalli/ufakpsi" className="underline font-crimson">Source Code</a>
          <a rel="noopener noreferrer" href="/admin" className="underline font-crimson">Admins</a>
        </div>
      </div>
    </section>
  )
}

export default Footer