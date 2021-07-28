// EMPRESA DEBE PERTENECER A UNA CATEGORIA.

//EXTRA: CONTROL DE HORARIO DE SERVICIO, EJM: 8:00PM.

// JSON de Apoyo a obtener la informacion de las empresas que pertenecen
// a una categoria.

//==========================NO==========
// categoriaEmpresas = [{
//     id: "",
//     nombreCategoria: "",
//     iconoCategoria:'',
//     empresasCategoria: [{
//         nombreComericalEmpresa: "",
//         RTN: "",
//         direccion: "",
//         logo: "",
//         banner: "",
//         descripcion: "",
//         contactoEmpresa: "",
//         telefonoContacto: "",
//         estado: "",
//         productosEmpresa: [{
//             id: "",
//             nombreProducto: "",
//             imagenProducto: [], //carrucel
//             descripcion:"",
//             precio: "",
//             cantidadExistente:"",
//             empresaDistribuye: ""
//         }]
//     }]
// }];

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
        fechaCreado:'',
        cantidadExistente:"",
        empresaDistribuye: "",
        idEmpresaDistribuye: ""
    }] 
}]

empresas: [{
    nombreComericalEmpresa: "",
    RTN: "",
    direccion: "",
    logo: "",
    banner: "",
    descripcion: "",
    telefono: "",
    estado: "",
    productosEmpresa: [{
        id: "",
        nombreProducto: "",
        imagenesProducto: [], //carrucel
        descripcion:"",
        precio: "",
        fechaCreado:'',
        cantidadExistente:"",
        empresaDistribuye: "",
        idEmpresaDistribuye: ""
    }],
    categorias: [] //IDs
}]


clientes = [{
    id: "",
    nombre: "",
    apellido: "",
    carrito: [],
    imagenPerfil: "",
    correoElectronico: "",
    fechaRegistro:"",
    password: "",
    telefono: "",
    ubicacion: [],
    ordenes: [{
        id: "alksdfjlkasdfkjaldf",
        idOrden: "123456789"
    }]
}];

ordenes = [{
    id: "",
    idOrden: "",
    idCliente: '',
    ubicacionEntrega: "Col. Aleman",
    nombreCliente: "",
    coordenadas: "",
    fechaRealizada:'',
    informacionPago:[],
    codigoVerificacion: '1111',
    idEmpresaDistribuye: "12",
    nombreEmpresaDistribuye: "Curacao",
    productos: [{
        id:'',
        idProducto:'',
        nombreProducto: "Computadora Acer",
        cantidad:"1",
    }], 
    nota: "",
    estadoOrden: "",
    Motorista:''
}];

estadoOrden= ['Tomada', 'Entregada', 'Disponible']

productos = [{
    id: "",
    nombreProducto: "",
    imagenesProducto: [], //carrucel
    descripcion:"",
    precio: "",
    fechaCreacion:'',
    cantidadExistente:"",
    empresaDistribuye: "", //ID
    idEmpresaDistribuye: ""
}]

motoristas = [{
    id: "klajdflkasdf",
    primerNombre: "",
    primerApellido:"",
    email:'',
    password:'',
    domicilio:'',
    numeroTelefono:'',
    imagenPerfil:'',
    estado: true,
    verificado: {
        userVerificador: "",
        fecha: ""
    },
    ordenesEntregadas: [{
        id: "ajsdfljakslfj",
        idOrden: "123456789"
    }],
    ordenTomada:[{
        id: "ajsdfljakslfj",
        idOrden: "123456789"
    }],
    
}];

