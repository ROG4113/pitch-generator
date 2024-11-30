import { useEffect, useRef, useState } from "react";
import { getOpenAiResponse } from "../services/openAI";
import InfoTable from "./InfoTable";

import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import Button from "./Button";

function Pitch({ info, tableInfo, query }) {
  const [companyAllDetails, setCompanyAllDetails] = useState([]);
  const [result, setResult] = useState();
  const { companyName, description, symbol, image } = info;

  const API_KEY = import.meta.env.VITE_FINANCE_API_KEY;

  useEffect(
    function () {
      async function getKeyMetrics() {
        try {
          const res = await fetch(
            `https://financialmodelingprep.com/api/v3/key-metrics/${query}?period=annual&apikey=${API_KEY}`
          );
          if (!res.ok) {
            throw new Error(`Response status: ${res.status}`);
          }

          const data = await res.json();
          setCompanyAllDetails((previous) => [...previous, data]);
        } catch (error) {
          console.error(error.message);
        }
      }
      async function getFinancialGrowth() {
        try {
          const res = await fetch(
            `https://financialmodelingprep.com/api/v3/financial-growth/AAPL?period=annual&apikey=${API_KEY}`
          );
          if (!res.ok) {
            throw new Error(`Response status: ${res.status}`);
          }

          const data = await res.json();
          setCompanyAllDetails((previous) => [...previous, data]);
        } catch (error) {
          console.error(error.message);
        }
      }
      getKeyMetrics();
      getFinancialGrowth();
    },
    [query]
  );

  useEffect(function () {
    callAI({ companyAllDetails });
  });
  async function callAI({ companyAllDetails }) {
    const result = await getOpenAiResponse(companyAllDetails);
    setResult(result);
  }

  const handleDownloadPDF = () => {
    const input = pdfRef.current;
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4", true);

      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();

      const imgWidth = canvas.width;
      const imgHeight = canvas.height;

      const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);

      const imgScaledWidth = imgWidth * ratio;
      const imgScaledHeight = imgHeight * ratio;

      const imgX = (pdfWidth - imgScaledWidth) / 2;
      const imgY = (pdfHeight - imgScaledHeight) / 2;

      pdf.addImage(imgData, "PNG", imgX, imgY, imgScaledWidth, imgScaledHeight);
      pdf.save("pitch.pdf");
    });
  };

  const pdfRef = useRef();

  return (
    <>
      <div className="App" ref={pdfRef}>
        <header className="bg-gray-800 text-white py-4">
          <div className="flex justify-center ">
            <img src={image} alt="logo" className="max-h-10 " />
            <h1 className="text-3xl text-center">{companyName}</h1>
          </div>
          <h3 className="text-1xl text-center">
            Ticket: <span>{symbol}</span>
          </h3>
        </header>
        <div className="container mx-auto p-6">
          <section id="business-description" title="Business Description">
            <h3 className="text-xl">Business Description:</h3>
            <p>{description}</p>
          </section>

          <InfoTable tableInfo={tableInfo} />

          {result}

          <section id="valuation" title="Valuation">
            <h3 className="text-xl">Investment Thesis:</h3>
            <p>
              Base Case: Using sum-of-parts valuation and peer multiples, the
              intrinsic value of IB is $52.4, representing a 54% upside.
            </p>
            <p>
              Bear Case: Assuming 80% of 2017 projections, multiple contraction,
              and lower excess capital valuation, the intrinsic value is $30.6,
              indicating a 10% downside.
            </p>
            <p>
              Bull Case: Assuming 110% of 2017 projections, higher multiples,
              and full excess capital valuation, the intrinsic value is $64.7,
              representing a 90% upside.
            </p>
            <h3 className="text-lg font-semibold mt-4">Industry Peers</h3>
            <table className="table-auto w-full mt-4">
              <thead>
                <tr>
                  <th className="px-4 py-2">Company</th>
                  <th className="px-4 py-2">P/E LTM</th>
                  <th className="px-4 py-2">P/E NTM</th>
                  <th className="px-4 py-2">Net Margins</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border px-4 py-2">Charles Schwab</td>
                  <td className="border px-4 py-2">28.0x</td>
                  <td className="border px-4 py-2">22.5x</td>
                  <td className="border px-4 py-2">22.3%</td>
                </tr>
                <tr>
                  <td className="border px-4 py-2">E*TRADE</td>
                  <td className="border px-4 py-2">34.0x</td>
                  <td className="border px-4 py-2">17.4x</td>
                  <td className="border px-4 py-2">12.1%</td>
                </tr>
                <tr>
                  <td className="border px-4 py-2">TD Ameritrade</td>
                  <td className="border px-4 py-2">20.1x</td>
                  <td className="border px-4 py-2">18.5x</td>
                  <td className="border px-4 py-2">25.4%</td>
                </tr>
                <tr>
                  <td className="border px-4 py-2">Investment Tech. Group</td>
                  <td className="border px-4 py-2">24.6x</td>
                  <td className="border px-4 py-2">26.8x</td>
                  <td className="border px-4 py-2">4.0%</td>
                </tr>
                <tr>
                  <td className="border px-4 py-2">
                    Interactive Brokers Group
                  </td>
                  <td className="border px-4 py-2">53.4x</td>
                  <td className="border px-4 py-2">23.3x</td>
                  <td className="border px-4 py-2">53.0%</td>
                </tr>
                <tr>
                  <td className="border px-4 py-2">Median</td>
                  <td className="border px-4 py-2">26.3x</td>
                  <td className="border px-4 py-2">20.5x</td>
                  <td className="border px-4 py-2">17.2%</td>
                </tr>
                <tr>
                  <td className="border px-4 py-2">Mean</td>
                  <td className="border px-4 py-2">26.7x</td>
                  <td className="border px-4 py-2">21.3x</td>
                  <td className="border px-4 py-2">16.0%</td>
                </tr>
              </tbody>
            </table>
          </section>
        </div>
      </div>
      <div className="flex justify-center" >
        <Button type="primary" onClick={handleDownloadPDF}  >
          Download PDF
        </Button>
      </div>
    </>
  );
}

export default Pitch;
