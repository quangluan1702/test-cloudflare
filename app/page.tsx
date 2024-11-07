import Image from "next/image";

interface IBackgroundImage {
  backgroundImage:any
  title: string;
  subtitle: string;
  description: string;
  IsPublic: boolean
};

export default async function Home  () {
  const request = await fetch(`${process.env.BASE_URL}/api/landing-activities?populate=*`, {
    // headers: {
    //   authorization: `Bearer ${process.env.API_TOKEN}`
    // }
  });  
  const res=  await request.json()
  const backgroundImages:IBackgroundImage[] = res.data
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      
        {backgroundImages
        .filter(({ IsPublic }) => IsPublic)
        .map(({ backgroundImage, title, subtitle }) => (
          <Image src={`${process.env.BASE_URL}${backgroundImage?.formats?.thumbnail?.url}`} key={subtitle} alt={title}  width={1000} height={1000}></Image>

        ))}
    </div>
  );
}
