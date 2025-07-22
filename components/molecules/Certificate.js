// components/Certificate.js
export default function Certificate({ name, competitionName }) {
  return (
    <div style={{
      width: "1117px", // ukuran A4
      height: "790px",
      backgroundImage: "url('/images/sertifikat.jpeg')",
      backgroundSize: "cover",
      // padding: "100px",
      textAlign: "center",
      fontFamily: "serif",
      color: "#000"
    }}>
      <h2 className="text-5xl pt-[270px] text-[#073b56]">{name}</h2>
      <h2 className="text-2xl pt-[38px] text-[#073b56]">Peserta {competitionName}</h2>
      {/* <p>Atas partisipasi dalam {event}</p>
      <p><i>{new Date().toLocaleDateString()}</i></p> */}
    </div>
  );
}
