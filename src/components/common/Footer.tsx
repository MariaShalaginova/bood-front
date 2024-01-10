import Image from 'next/image';

export default function Footer() {
    return (
        <div>
            <Image
                loading="lazy"
                src="/footer.png"
                alt="Footer Image"
                width={1440}  // Replace with the actual width of your image
                height={545}  // Replace with the actual height of your image
                className="w-full object-cover object-center"
            />
            <footer className='bg-yellow-400 h-16'>
                <div className='h-full px-2'>
                    <div className='flex items-center justify-center h-full'>
                        <p className="text-neutral-800 mt-2 text-sm">
                            &copy; 2023 b00d. All rights reserved.
                        </p>
                    </div>
                </div>
            </footer>
        </div>
    );
}
