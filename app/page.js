"use client"
import { useRef, useState } from "react";
import { toPng } from "html-to-image";
import axios from "axios";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { SkeletonLoading } from "@/components/component/SkeletonLoading";


export default function Home() {
  const [value, setValue] = useState({})
  const [link, setLink] = useState("")
  const [status, setStatus] = useState("")
  const cardRef = useRef(null)
  

  const fetchData = async (e) => {
    setStatus("fetching")
    e.preventDefault()
    try{
      const response = await axios.get("api/scrape", {
        params: {
          link
        }
      });
      const data = await response.data
      if(data.name == "TimeoutError"){
        throw new Error("TimeoutError")
      }
      if(data.Harga == null){
        throw new Error("HargaError")
      }
      setValue(data)
      setStatus("success")
    } catch (error) {
      console.log(error)
      setStatus(error.message)
    }
  }

  const handleDownloadImage = async () => {
    if (cardRef.current === null) {
      return;
    }

    try {
      const dataUrl = await toPng(cardRef.current);
      const link = document.createElement('a');
      link.href = dataUrl;
      link.download = `${value['Nama Produk']}.png`;
      link.click();
    } catch (error) {
      console.error('Failed to save the image.', error);
    }
  };
  console.log(status)
  console.log(value)

  return (
    <>
      <div className="grid md:grid-cols-2 gap-6 lg:gap-12 items-start max-w-6xl px-4 mx-auto py-6">
      <div className="grid gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Product Card Generator</CardTitle>
          </CardHeader>
          <CardContent>
            <form className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="link">Link</Label>
                <Input
                  id="link"
                  type="text"
                  className="w-full"
                  value={link}
                  onChange={(e) => setLink(e.target.value)}
                  placeholder="Masukkan link produk disini.." />
                  {status == "TimeoutError" && (
                    <>
                    <p className="text-red-500 text-sm">Link tidak valid</p>
                    <span className="text-sm text-muted-foreground">Contoh link valid: <span className="font-bold">https://e-katalog.lkpp.go.id/katalog/produk/detail/47660544?lang=id&type=regency&location_id=326</span></span>
                    </>
                  )}
                  {status == "HargaError" && (
                    <>
                    <p className="text-red-500 text-sm">Pilih lokasi terlebih dahulu, pastikan id lokasi valid</p>
                    <span className="text-sm text-muted-foreground">Contoh id valid: <span>https://e-katalog.lkpp.go.id/katalog/produk/detail/47660544?lang=id&type=regency&location_</span><span className="font-bold text-black underline">id=326</span></span>
                    </>
                  )}
              </div>
              <Button className="w-full" onClick={(e) => fetchData(e)} disabled={status == "fetching"}>{status == "fetching" ? "Loading..." : "Generate Card"}</Button>
            </form>
          </CardContent>
        </Card>
      </div>
      {status == "fetching" || status == "" ? <SkeletonLoading /> : (
      <div className="grid gap-4 w-96">
        <Card className="w-full" ref={cardRef}>
          <img
            src={`./images/${value.url}`}
            alt="Product Image"
            width={600}
            height={400}
            className="w-full h-[200px] object-fill rounded-t-lg"
            style={{ aspectRatio: "600/400"}} />
          <Separator className="my-4" />
          <div className="px-4 py-2">
            <h3 className="text-lg font-semibold">{value["Nama Produk"]}</h3>
            <div className="flex items-center gap-2 text-primary">
              <span className="text-2xl font-bold">{value["Harga"]}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span>Penyedia : {value["Nama Penyedia"]}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span>Merek : {value["Merek"]}</span>
            </div>
            
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span>Produk ID : {value["Produk Id"]}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span>Komponen: {value["Komponen biaya"]}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span>Wilayah: Kota Banjarbaru</span>
            </div>
          </div>
        </Card>
        <Button className="w-full" onClick={handleDownloadImage}>Save As Image</Button>
      </div>
    )}
    </div>
    </>
  );
}
