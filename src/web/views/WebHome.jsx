import '../../assets/css/plugins/font-awesome.min.css';
import '../../assets/css/plantilla.css';
import '../../assets/css/headers.css';

import { Header } from "../components/Header";

export const WebHome = () => {

    return (
        <>
            <html lang="en">
                <head>
                    <meta charset="UTF-8" />
                    <meta name="viewport" content="width=device-width, initial-scale=1.0 minimu-scale=1.0" />
                    <meta name="title" content="Tienda Virtual"/>
                    <meta name="description" content="Lorem ipsum" />
                    <meta name="keyword" content="Lorem ipsum"/>
                    <title>Tienda Virtual</title>
                    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.2/dist/css/bootstrap.min.css" integrity="sha384-xOolHFLEh07PJGoPkLv1IbcEPTNtaed2xpHsD9ESMhqIYd0nLMwNLD69Npy4HI+N" crossorigin="anonymous"></link>
                    <script src="https://cdn.jsdelivr.net/npm/jquery@3.5.1/dist/jquery.slim.min.js" integrity="sha384-DfXdz2htPH0lsSSs5nCTpuj/zy4C+OGpamoFVy38MVBnE+IbbVYUew+OrCXaRkfj" crossorigin="anonymous"></script>
                    <script src="https://cdn.jsdelivr.net/npm/bootstrap@4.6.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-Fy6S3B9q64WdZWQUiU+q4/2Lc9npb8tCaSX9FK7E8HnRr0Jz8D6OP9dO5Vg3Q9ct" crossorigin="anonymous"></script>
                
                </head>
            <body>
                <Header />
            </body>
            </html>
        </>
    );
};