// EMPRESA DEBE PERTENECER A UNA CATEGORIA.

//EXTRA: CONTROL DE HORARIO DE SERVICIO, EJM: 8:00PM.

// JSON de Apoyo a obtener la informacion de las empresas que pertenecen
// a una categoria.

//==========================NO==========
categoriaEmpresas = [{
    id: "",
    nombreCategoria: "",
    iconoCategoria:'',
    empresasCategoria: [{
        nombreComericalEmpresa: "",
        RTN: "",
        direccion: "",
        logo: "",
        banner: "",
        descripcion: "",
        contactoEmpresa: "",
        telefonoContacto: "",
        estado: "",
        productosEmpresa: [{
            nombreProducto: "",
            imagenProducto: [], //carrucel
            descripcion:"",

            precio: ""
        }]
    }]
}];

//====================================

categorias: [{
    id: "",
    nombreCategoria: "",
    iconoCategoria:"",
    descripcion: "",
    productos: [{
        id: "",
        nombreProducto: "",
        imagenProducto: [], //carrucel
        descripcion:"",
        precio: "",
        cantidadExistente:""
    }] 
}]

empresas: [{
    nombreComericalEmpresa: "",
    RTN: "",
    direccion: "",
    logo: "",
    banner: "",
    descripcion: "",
    contactoEmpresa: "",
    telefonoContacto: "",
    estado: "",
    productosEmpresa: [{
        nombreProducto: "",
        imagenProducto: [], //carrucel
        descripcion:"",

        precio: ""
    }],
    categorias: []
}]


clientes = [{
    id: "",
    nombre: "",
    apellido: "",
    carrito: [],
    imagenPerfil: "",
    correoElectronico: "",
    password: "",
    telefono: "",
    ubicacion: [],
    ordenes: [{
        id: "alksdfjlkasdfkjaldf",
        idOrden: "123456789"
    }]
}];

orden = [{
    id: "",
    idOrden: "",
    ubicacionEntrega: "",
    informacionPago:[],
    productos: [{id:"", cantidad:""}], 
    nota: "",
    estadoOrden: "",
    Motorista:
}]

estadoOrden= ['Tomada', 'En Camino', 'Entregada']

motoristas = [{
    id: "klajdflkasdf",
    nombreMotorista: "",
    estado: true,
    verificado: {
        userVerificador: "",
        fecha: ""
    },
    ordenesEntregadas: [{
        id: "ajsdfljakslfj",
        idOrden: "123456789"
    }],
    //ORDENES TOMADAS PENDIENTES DE ENTREGAR
    ordenesTomadas: [{
        id: "ajsdfljakslfj",
        idOrden: "123456789"
    }]
}];

ordenes = [{
    id: "123456789",
    fecha: "",
    direccion: "",
    motorista: "",
    direccion: "",
    coordenadas: "",
    productos: [{
        id: "laksjdflakjsdf", //id orden
        cantidad: "",
        comentarios: ""
    }]
}];