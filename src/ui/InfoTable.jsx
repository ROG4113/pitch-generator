function InfoTable({tableInfo}) {
    return (
        <div className="container mx-auto p-6">
        <section id="valuation" title="Valuation">
          <div className="overflow-x-auto">
            <table className="table-auto w-full border-collapse border border-gray-400">
              <tbody>
                <tr>
                  <td className="border px-4 py-2 font-semibold">Price</td>
                  <td className="border px-4 py-2">${tableInfo?.price}</td>
                </tr>

                {/* EBITDA */}
                {/* cash flow yield */}
                {/* 12 month price target */}

                <tr>
                  <td className="border px-4 py-2 font-semibold">52 week high</td>
                  <td className="border px-4 py-2">${tableInfo?.yearHigh}</td>
                </tr>
                <tr>
                  <td className="border px-4 py-2 font-semibold">52 week low</td>
                  <td className="border px-4 py-2">${tableInfo?.yearLow}</td>
                </tr>
                <tr>
                  <td className="border px-4 py-2 font-semibold">Total Market Cap. ($B)</td>
                  <td className="border px-4 py-2">${tableInfo?.marketCap}</td>
                </tr>
                <tr>
                  <td className="border px-4 py-2 font-semibold">Average Traded Volume</td>
                  {/* round off with k */}
                  <td className="border px-4 py-2">{tableInfo?.avgVolume}</td>
                </tr>
                <tr>
                  <td className="border px-4 py-2 font-semibold">50 Days Moving Avg.</td>
                  <td className="border px-4 py-2">{tableInfo?.priceAvg50}</td>
                </tr>
                <tr>
                  <td className="border px-4 py-2 font-semibold">200 Days Moving Avg.</td>
                  <td className="border px-4 py-2">{tableInfo?.priceAvg200}</td>
                </tr>
                <tr>
                  <td className="border px-4 py-2 font-semibold">P/E (NTM)</td>
                  <td className="border px-4 py-2">{tableInfo?.pe}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
      </div>
    )
}

export default InfoTable
