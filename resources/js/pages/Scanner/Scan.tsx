import { Scanner, type IDetectedBarcode } from "@yudiel/react-qr-scanner";
import { useEffect, useRef } from "react";
import { router, useForm } from "@inertiajs/react";

interface ScannerPageProps {
  result: boolean;
}

export default function ScannerPage({ result }: ScannerPageProps) {
  const { data, setData, post, reset, processing } = useForm({
    qr_code: "",
  });

  const lastSubmittedQr = useRef<string>("");

  useEffect(() => {
    const interval = setInterval(() => {
      router.reload({ only: ["is_active"] });
    }, 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  // handleScan now accepts IDetectedBarcode[]
  const handleScan = (detectedCodes: IDetectedBarcode[]) => {
    if (detectedCodes.length > 0) {
      const qrValue = detectedCodes[0].rawValue;

      if (qrValue && qrValue !== lastSubmittedQr.current && !processing) {
        lastSubmittedQr.current = qrValue;
        setData("qr_code", qrValue);
      }
    }
  };

  useEffect(() => {
    if (data.qr_code && !processing) {
      post("/attendance/scan", {
        onSuccess: () => {
          reset("qr_code");
          lastSubmittedQr.current = "";
        },
        onError: () => {
          reset("qr_code");
          lastSubmittedQr.current = "";
        },
      });
    }
  }, [data.qr_code, processing, post, reset]);

  const handleError = (error: unknown) => {
    console.error("Scanner error:", error);
  };

  return (
    <>
      {result ? (
        <Scanner onScan={handleScan} onError={handleError} />
      ) : (
        <p>Scanner tidak aktif</p>
      )}
    </>
  );
}
