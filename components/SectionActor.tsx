import React from "react";
import Heart from "./Heart";
import Image from "next/image";
import CountDown from "./CountDown";

const SectionActor = () => {
    return (
        <div className="relative max-auto w-full bg-white min-h-[450px] h-fit min-w-[20px] flex flex-col items-center overflow-hidden">
            <div className="flex py-10 flex-col h-auto w-full min-w-[20px] text-black text-[16.848px] font-medium text-center leading-[1.45] tracking-[0px] normal-case no-underline not-italic pointer-events-none overflow-hidden break-words font-quicksand [text-shadow:0_0_2px_rgba(0,0,0,0)]">
                <span>To Our Family And Friends,</span>
                <span>Thank You For Celebrating Our Special Day,</span>
                <span>Supporting Us And Sharing Our Love.</span>
            </div>
            <Heart />
            <Image
                src="/images/my_lover.png"
                alt="Wedding Quote Image"
                width={250}
                height={50}
                className="object-cover mt-10"
                priority
            />
            <div className="flex justify-around w-full  h-auto min-w-[20px] text-black text-[24.336px] font-medium text-center leading-normal tracking-[0px] normal-case no-underline not-italic pointer-events-none overflow-hidden break-words font-mallong [text-shadow:0_0_2px_rgba(0,0,0,0)]"
            >
                <div className="flex flex-col gap-3 w-1/2 items-center">

                    <Image
                        src="/images/groom.jpg"
                        alt="Wedding Quote Image"
                        width={168}
                        height={240}
                        className="object-cover mt-10"
                        priority
                    />
                    <span>|</span>
                    <span>Hà Lợi</span>
                </div>
                <div className="flex flex-col gap-3 w-1/2 items-center">
                    <Image
                        src="/images/bridal.jpg"
                        alt="Wedding Quote Image"
                        width={168}
                        height={240}
                        className="object-cover mt-10"
                        priority
                    />
                    <span>|</span>
                    <span>Trần Hằng</span>
                </div>
            </div>
            <span className="flex py-10 flex-col h-auto w-full min-w-[20px] text-black text-[16.848px] font-medium text-center leading-[1.45] tracking-[0px] normal-case no-underline not-italic pointer-events-none overflow-hidden break-words font-quicksand [text-shadow:0_0_2px_rgba(0,0,0,0)]"><span>My heart, the bird of the wilderness has found</span> <span>its sky in your eye.</span></span>
            <div className="flex justify-between w-full">
                <span className="h-auto w-full min-w-[20px] text-black text-[24.336px] font-medium text-center leading-normal tracking-[0px] normal-case no-underline not-italic pointer-events-none overflow-hidden break-words font-showcase [text-shadow:0_0_2px_rgba(0,0,0,0)]"
                >Welcome</span>
                <span className="h-auto w-full min-w-[20px] text-black text-[24.336px] font-medium text-center leading-normal tracking-[0px] normal-case no-underline not-italic pointer-events-none overflow-hidden break-words font-showcase [text-shadow:0_0_2px_rgba(0,0,0,0)]"
                >To
                </span>
                <span className="h-auto w-full min-w-[20px] text-black text-[24.336px] font-medium text-center leading-normal tracking-[0px] normal-case no-underline not-italic pointer-events-none overflow-hidden break-words font-showcase [text-shadow:0_0_2px_rgba(0,0,0,0)]"
                > Wedding</span>
            </div>
            <div className="h-[843px] max-w-[468px] relative w-full">
                <Image
                    src="/images/album_layout.png"
                    alt="Wedding Quote Image"
                    fill
                    className="object-cover"
                    priority
                />
                <div className="absolute -top-4 md:left-[45px] left-[26px]">
                    <Image
                        src="/images/picture_2.jpg"
                        alt="Wedding Quote Image"
                        className="object-cover mt-10  w-[380] h-[260px] object-[25%_25%] "
                        priority
                        width={380}
                        height={260}
                    />

                    <span className="h-auto w-full min-w-[20px] absolute bottom-2 text-white text-[14.976px] font-medium text-center leading-normal tracking-[0px] normal-case no-underline not-italic pointer-events-none overflow-hidden break-words font-quicksand [text-shadow:0_0_2px_rgba(0,0,0,0)]"
                    >I love three things in this world.</span>
                </div>
                <div className="absolute top-[250px] md:left-[45px] left-[26px]">
                    <Image
                        src="/images/picture_6.jpg"
                        alt="Wedding Quote Image"
                        className="object-cover mt-10  w-[380] h-[260px] object-[25%_85%] "
                        priority
                        width={380}
                        height={260}
                    />
                    <span className="h-auto w-full min-w-[20px] absolute bottom-2 text-white text-[14.976px] font-medium text-center leading-normal tracking-[0px] normal-case no-underline not-italic pointer-events-none overflow-hidden break-words font-quicksand [text-shadow:0_0_2px_rgba(0,0,0,0)]"
                    >Sun, moon and you.</span>
                </div>
                <div className=" absolute top-[518px] md:left-[45px] left-[26px]">
                    <Image
                        src="/images/picture_4.jpg"
                        alt="Wedding Quote Image"
                        className="object-cover mt-10 w-[380] h-[260px] object-center"
                        priority
                        width={380}
                        height={260}
                    />
                    <span className="h-auto w-full min-w-[20px] absolute bottom-2 text-white text-[14.976px] font-medium text-center leading-normal tracking-[0px] normal-case no-underline not-italic pointer-events-none overflow-hidden break-words font-quicksand [text-shadow:0_0_2px_rgba(0,0,0,0)]"
                    >Sun for morning,moon for night, and you forever.</span>
                </div>
            </div>
            <CountDown />
        </div >
    );
};

export default SectionActor;
