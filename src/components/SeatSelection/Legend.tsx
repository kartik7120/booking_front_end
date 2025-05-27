export default function Legend() {
    return (
        <div className="flex flex-row items-center gap-x-4">
            <div style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
                {/* Available */}
                <span className="bg-white border-2 border-green-700 w-5 h-5 inline-block"></span>
                <span> Available</span>
            </div>
            <div style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
                {/* Selected */}
                <span className="bg-green-500 border-2 border-green-700 w-5 h-5 inline-block"></span>
                <span> Selected</span>
            </div>
            <div style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
                {/* Sold */}
                <span className="bg-gray-400 w-5 h-5 inline-block"></span>
                <span> Sold</span>
            </div>
        </div>
    )
}
