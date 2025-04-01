export default function Home() {
    fetch("http://localhost:5000", {
        headers: {
            'Authorization': localStorage.getItem("token") || ""
        }
    })
    return <p>Temporary Homepage</p>
}