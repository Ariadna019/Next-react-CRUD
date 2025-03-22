/** @type {import('next').NextConfig} */
const nextConfig = {
    async redirects() {
        return [
            {
                source: "/",
                destination: "/products",
                permanent: true,
            }
        ]
    }


};
//aca en esta aprte permite que leugo de actulziar o editar en un fromaulrio autoamtica apresca en la pagina principal
export default nextConfig;
