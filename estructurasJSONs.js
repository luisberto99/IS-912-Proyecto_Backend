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
    coordenadas: "",
    fechaRealizada:'',
    informacionPago:[],
    productos: [{id:"", cantidad:""}], 
    nota: "",
    estadoOrden: "",
    Motorista:''
}];

estadoOrden= ['Tomada', 'En Camino', 'Entregada']

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

