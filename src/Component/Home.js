import { useRef, useState } from "react"
import ReactCrop from 'react-image-crop'
export default function Home() {
    const [image, setImage] = useState()
    const canvasRef = useRef(null);
    const [crop, setCrop] = useState()
    const [filters, setFilters] = useState({
        hue: 0,
        blur: 0,
        brightness: 100,
        contrast: 100,
        saturation: 100,
        grayscale: 0
    })

    const fileref = useRef()
    function handleUpload() {
        console.log(fileref.current.files[0])
        const file = fileref.current.files[0]
        const reader = new FileReader
        reader.readAsDataURL(file)
        reader.onload = () => {
            setImage(reader.result)
        }

    }
    const filterStyle = {
        filter: `blur(${filters.blur}px) brightness(${filters.brightness}%) contrast(${filters.contrast}%) saturate(${filters.saturation}%) grayscale(${filters.grayscale}%) hue-rotate(${filters.hue}deg)`,
        width: "30vw"
    }

    const applyFilter = () => {

        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');

        const img = new Image();
        img.src = image;
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.filter = filterStyle.filter;
        ctx.drawImage(img, 0, 0);

        const dataURL = canvas.toDataURL('image/png');
        const downloadLink = document.createElement('a');
        downloadLink.href = dataURL;
        downloadLink.download = 'filtered-image.png';
        downloadLink.click();

    };
    const handleCoordinates = (e) => {
        console.log(e.clientX, e.clientY)

    }

    console.log(filters)
    return (
        <>
            <div className="container">
                <div className="top_container">
                    <ReactCrop crop={crop} onChange={(crop, percentCrop) => setCrop(crop)} >
                        <img src={image} className="image_size" onMouseMove={(e) => { handleCoordinates(e) }} style={filterStyle} alt="" />
                    </ReactCrop>
                    <input type="file" ref={fileref} onChange={handleUpload} id="" />
                </div>

            </div>
            <FilterBars setFilters={setFilters} />
            <button onClick={applyFilter}>Download Filtered Image</button>
            <canvas ref={canvasRef} style={{ display: 'none' }} />
        </>
    )
}

const FilterBars = ({ setFilters }) => {
    const handleRange = (e) => {
        setFilters((prev) => {
            return {
                ...prev, [e.target.name]: e.target.value
            }
        })
    }
    return (
        <>
            <label htmlFor="">hue</label>
            <input type="range" name="hue" max={360} onChange={handleRange} id="" />
            <label htmlFor="">blur</label>
            <input type="range" max={10} name="blur" onChange={handleRange} id="" />
            <label htmlFor="">brightness</label>
            <input type="range" max={300} name="brightness" onChange={handleRange} id="" />
            <label htmlFor="">contrast</label>
            <input type="range" max={200} min={50} name="contrast" onChange={handleRange} id="" />
            <label htmlFor="">saturation</label>
            <input type="range" max={200} name="saturation" onChange={handleRange} id="" />
            <label htmlFor="">grayscale</label>
            <input type="range" name="grayscale" onChange={handleRange} id="" />
        </>
    )
}