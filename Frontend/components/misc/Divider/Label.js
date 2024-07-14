export default function LabelDivider({ label }) {
    return (
        <div className="flex place-items-center mb-5">
            <span className="text-xl min-w-max font-bold w-1/5 pr-7 sm:pr-0">
                {label}
            </span>
            <hr className="w-4/5" style={{ border: '1px solid black' }} />
        </div>
    )
}