export default function PressContainer({ children }: React.PropsWithChildren) {
    return (
        <div className="relative flex w-full flex-col items-center p-8 min-h-screen bg-[#f1f3fa]">
            <h1 className="mb-6 px-4 text-center text-[28px] font-extrabold text-[#0172AF] xs:text-left md:text-5xl">
                Press and Publications
            </h1>
            {children}
        </div>
    );
}
