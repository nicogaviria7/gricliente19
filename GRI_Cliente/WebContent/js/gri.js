(function($) {
  "use strict"; // Start of use strict

  $(document).ready( function () {

  // Toggle the side navigation
  $("#sidebarToggle").on('click',function(e) {
    e.preventDefault();
    $("body").toggleClass("sidebar-toggled");
    $(".sidebar").toggleClass("toggled");
  });

  // Prevent the content wrapper from scrolling when the fixed side navigation hovered over
  $('body.fixed-nav .sidebar').on('mousewheel DOMMouseScroll wheel', function(e) {
    if ($(window).width() > 768) {
      var e0 = e.originalEvent,
      delta = e0.wheelDelta || -e0.detail;
      this.scrollTop += (delta < 0 ? 1 : -1) * 30;
      e.preventDefault();
    }
  });

  // Smooth scrolling using jQuery easing
  $(document).on('click', 'a.scroll-to-top', function(event) {
    var $anchor = $(this);
    $('html, body').stop().animate({
      scrollTop: ($($anchor.attr('href')).offset().top)
    }, 1000, 'easeInOutExpo');
    event.preventDefault();
  });

if(document.getElementById('badge')) {
 $.ajax({
               type: "GET",
               contentType:"application/json",
               url: "/GRI_Server/rest/service/stats",
               dataType: 'json',
               cache: false,
               success: function (data) {
                 document.getElementById('badge-investigadores').innerHTML = data[0];
                  document.getElementById('badge-grupos').innerHTML = data[1];
                     document.getElementById('badge-centros').innerHTML = data[2];
               }
           });
}

if(document.getElementById('titulo')){
   var id = getParameterByName('id');
    var type = getParameterByName('type');

    if(type=='i'){
      document.getElementById('side-investigadores').classList.add('active');
      var uri = "/GRI_Server/rest/service/investigadores/"+id;
      $.ajax({
               type: "GET",
               contentType:"application/json",
               url: uri,
               dataType: 'json',
               cache: false,
               success: function (data) {
                 document.getElementById('titulo').innerHTML = data.nombre;
                 document.getElementById('sidebar').classList.add('card-0');
                 if(document.getElementById('info-personal')){
                	 document.getElementById('name').innerHTML = data.nombre;
                	 document.getElementById('categoria').innerHTML = data.categoria;
                	 document.getElementById('nivelAcademico').innerHTML = data.nivelAcademico;
                	 document.getElementById('pertenencia').innerHTML = data.pertenencia;
                	 
                	 
                	 
                	 var grupos = data.grupos;
                	 
                	
                	 for(var i=0; i<grupos.length; i++){			
                		 $('#lista-grupos').append(
          					    $('<div>').addClass('row ml-0').append(
          					    	$('<p>').append('• '+grupos[i].grupo.nombre)        					    	
          					    )); 
            	}
                	 
                	 var idiomas = data.idiomas;
                	 console.log(idiomas);
                	 $('#tabla_idiomas').DataTable( {
                		    data: idiomas,
                		      columns: [
                		      { data: "idioma", className:"font-weight-bold"},
                		      { data: "habla" } ,
                		      { data: "escribe" } ,
                		      { data: "lee" },
                		      { data: "entiende" }
                		      ]
                		    } );
                 }            
                 
               }
           });

    }else if(type=='g'){
      document.getElementById('side-grupos').classList.add('active');
       var uri = "/GRI_Server/rest/service/grupos/"+id;
      $.ajax({
               type: "GET",
               contentType:"application/json",
               url: uri,
               dataType: 'json',
               cache: false,
               success: function (data) {
                 document.getElementById('titulo').innerHTML = data.nombre;
                 document.getElementById('navigation-bar').classList.add('card-'+data.programas[0].facultad.id);
                 document.getElementById('sidebar').classList.add('card-'+data.programas[0].facultad.id);
               }
           });

    }else if(type=='f'){
      document.getElementById('side-grupos').classList.add('active');
      var uri = "/GRI_Server/rest/service/facultades/"+id;
      $.ajax({
               type: "GET",
               contentType:"application/json",
               url: uri,
               dataType: 'json',
               cache: false,
               success: function (data) {
                 document.getElementById('titulo').innerHTML = data.nombre;
                 document.getElementById('navigation-bar').classList.add('card-'+data.id);
                 document.getElementById('sidebar').classList.add('card-'+data.id);
               }
           });
      if(document.getElementById('miembros')){
      $.ajax({
          type: "GET",
          contentType:"application/json",
          url: "/GRI_Server/rest/service/programasfacultad/"+id,
          dataType: 'json',
          cache: false,
          success: function (data) {
            llenarLista(data, 'p');
          }
      });
      }
      
    }else if(type=='p'){
      document.getElementById('side-grupos').classList.add('active');
      var uri = "/GRI_Server/rest/service/programas/"+id;
      $.ajax({
               type: "GET",
               contentType:"application/json",
               url: uri,
               dataType: 'json',
               cache: false,
               success: function (data) {
            	 document.getElementById('titulo').innerHTML = data.nombre;
            	 document.getElementById('navigation-bar').classList.add('card-'+data.facultad.id);
            	 document.getElementById('sidebar').classList.add('card-'+data.facultad.id);
               }
           });
      if(document.getElementById('miembros')){
      $.ajax({
          type: "GET",
          contentType:"application/json",
          url: "/GRI_Server/rest/service/gruposprograma/"+id,
          dataType: 'json',
          cache: false,
          success: function (data) {
            llenarLista(data,'g');
          }
      });
      }
    }else if(type=='c'){
    	document.getElementById('side-grupos').classList.remove('active');
      document.getElementById('side-centros').classList.add('active');   
      var uri = "/GRI_Server/rest/service/centros/"+id;
      $.ajax({
               type: "GET",
               contentType:"application/json",
               url: uri,
               dataType: 'json',
               cache: false,
               success: function (data) {
                 document.getElementById('titulo').innerHTML = data.nombre;
                 document.getElementById('navigation-bar').classList.add('card-'+data.facultad.id);
                 document.getElementById('sidebar').classList.add('card-'+data.facultad.id);
               }
           });
      
      if(document.getElementById('miembros')){
          $.ajax({
              type: "GET",
              contentType:"application/json",
              url: "/GRI_Server/rest/service/gruposcentro/"+id,
              dataType: 'json',
              cache: false,
              success: function (data) {
                llenarLista(data, 'c');
              }
          });
          }
    }else if(type=='u'){
    	document.getElementById('side-grupos').classList.add('active');
    	 document.getElementById('titulo').innerHTML = "TIPOLOGÍA DE PRODUCTOS PARA LA UNIVERSIDAD DEL QUINDÍO";
    	 $.ajax({
             type: "GET",
             contentType:"application/json",
             url: "/GRI_Server/rest/service/facultades/",
             dataType: 'json',
             cache: false,
             success: function (data) {
         		document.getElementById('navigation-bar').classList.add('card-0');
         		document.getElementById('sidebar').classList.add('card-0');
            	 llenarLista(data, 'f');
            	
             }
         });
    }
}


  if(document.getElementById('table')) {
    $.extend( $.fn.dataTable.defaults, {
      responsive: true,
      dom: 'Bfrtip',
      buttons: [
      {
        extend: 'copy',
        text: 'Copiar',
        className: 'copyButton'
      },
      {
        extend: 'excel',
        text: 'Excel',
        className: 'excelButton'
      },
      {
        extend: 'pdf',
        text: 'PDF',
        className: 'pdfButton'
      },
      {
        extend: 'print',
        text: 'Imprimir',
        className: 'printButton'
      }
      ],

      language: {
        processing:     "Procesamiento en curso...",
        search:         "Buscar: ",
        lengthMenu:    "Mostrando _MENU_ elementos",
        info:           "Mostrando _START_ a _END_ de _TOTAL_ elementos",
        infoEmpty:      "Mostrando 0 a 0 de 0 elementos",
        infoFiltered:   "(filtrado de _MAX_ elementos en total)",
        infoPostFix:    "",
        loadingRecords: "Cargando resultados...",
        zeroRecords:    "No hay información para mostrar",
        emptyTable:     "No hay información para mostrar",
        paginate: {
          first:      "Primera",
          previous:   "Anterior",
          next:       "Siguiente",
          last:       "última"
        }
      }
    } );
  }

  var tabla_investigadores= $('#tabla_investigadores').DataTable( {
    ajax:{
      url:'/GRI_Server/rest/service/investigadores',
      dataSrc:"" },
      rowId: 'id',
      "order": [[ 1, "asc" ]],
      columns: [
      { data: "id" , visible:false},
      { data: "nombre" } ,
      { data: "categoria" } ,
      { data: "nivelAcademico" }
      ]
    } );

  var tabla_grupos= $('#tabla_grupos').DataTable( {
    ajax:{
      url:'/GRI_Server/rest/service/grupos',
      dataSrc:"" },
      rowId: 'id',
      "order": [[ 1, "asc" ]],
      columns: [
      { data: "id" , visible:false},
      { data: "nombre" },
      { data: "areaConocimiento" }   ,
      { data: "anioFundacion" }  ,
      { data: "lider" }   ,
      { data: "categoria" }
      ]
    } );

  var tabla_facultades= $('#tabla_facultades').DataTable( {
    ajax:{
      url:'/GRI_Server/rest/service/facultades',
      dataSrc:"" },
      rowId: 'id',
      "order": [[ 1, "asc" ]],
      columns: [
      { data: "id", "visible": false },
      { data: "nombre" }
      ]
    } );

  var tabla_programas= $('#tabla_programas').DataTable( {
    ajax:{
      url:'/GRI_Server/rest/service/programas',
      dataSrc:"" },
      rowId: 'id',
      "order": [[ 1, "asc" ]],
      columns: [
      { data: "id", "visible": false },
      { data: "nombre" } ,
      { data: "facultad.nombre" }
      ]
    } );



  var tabla_centros= $('#tabla_centros').DataTable( {
    responsive: true,
    ajax:{
      url:'/GRI_Server/rest/service/centros',
      dataSrc:"" },
      rowId: 'id',
      columns: [
      { data: "id", "visible": false },
      { data: "nombre" },
      { data: "facultad.nombre" }
      ]
    } );

  $('#tabla_investigadores tbody').on('click', 'tr', function () {
    var data = tabla_investigadores.row( this ).data();
    window.location.href="home.html"+"?id="+data.id+"&type=i";
  } );

  $('#tabla_grupos tbody').on('click', 'tr', function () {
    var data = tabla_grupos.row( this ).data();
    window.location.href="home_grupos.html"+"?id="+data.id+"&type=g";
  } );

  $('#tabla_facultades tbody').on('click', 'tr', function () {
    var data = tabla_facultades.row( this ).data();
    window.location.href="home_grupos.html"+"?id="+data.id+"&type=f";
  } );

  $('#tabla_programas tbody').on('click', 'tr', function () {
    var data = tabla_programas.row( this ).data();
    window.location.href="home_grupos.html"+"?id="+data.id+"&type=p";
  } );

  $('#tabla_centros tbody').on('click', 'tr', function () {
    var data = tabla_centros.row( this ).data();
    window.location.href="general.html"+"?id="+data.id+"&type=c";
  });
  

  $("a[rel~='keep-params']").click(function(e) {
    e.preventDefault();
    var params = window.location.search;
    var url = $(this).attr('href');
    if(url.includes('?')){
      params= params.substring(1);
    }
    var dest = url + params;
    window.location.href = dest;
  });

  if(document.getElementById('subtitulo')){
		var tipo = getParameterByName('prod');
		var type = getParameterByName('type');
		var id = '';
		if(type == 'u'){
			id = 1;
		}else{
			id = getParameterByName('id');
		}

		var uri = "/GRI_Server/rest/service/tipos/"+tipo;
		 $.ajax({
	         type: "GET",
	         contentType:"application/json",
	         url: uri,
	         dataType: 'json',
	         cache: false,
	         success: function (data) {
	        	 document.getElementById('subtitulo').innerHTML = data.nombre;
	        	 
	        	 var url = "/GRI_Server/rest/service/producciones/"+type+"/"+id+"/"+tipo;
	        	 $.ajax({
	    	         type: "GET",
	    	         contentType:"application/json",
	    	         url: url,
	    	         dataType: 'json',
	    	         cache: false,
	    	         success: function (json) {
	    	        	 mostrarTabla(data, json);
	    	        	 mostrarGraficoBarras(data, json);
	    	         }
	        	 });
 		
	         }
	     });

	  }

  
if(document.getElementById('tabla_integrantes')){
	  var type = getParameterByName('type');
	  var id = '';
	  if(type == 'u'){
		  id = '1';
	  }else{
		  id = getParameterByName('id');
	  }
  
	  var url = "/GRI_Server/rest/service/integrantes/"+type+"/"+id;
	  
	  $.ajax({
	         type: "GET",
	         contentType:"application/json",
	         url: url,
	         dataType: 'json',
	         cache: false,
	         success: function (json) { 
	        var tabla_integrantes= $('#tabla_integrantes').DataTable( {
	      	         data: json,
	      	         rowId: 'id',
	      	         columns: [
	      	         { data: "id" , visible:false},
	      	         { data: "nombre" } ,
	      	         { data: "categoria" } ,
	      	         { data: "nivelAcademico" } ,
	      	         { data: "pertenencia" }
	      	         ]
	      	       } );
	        	
	        	 
	        	 var res = getData(json, 'categoria')
	        	 Highcharts.chart('pie-categorias', {
	        		    chart: {
	        		        plotBackgroundColor: null,
	        		        plotBorderWidth: null,
	        		        plotShadow: false,
	        		        type: 'pie'
	        		    },
	        		    title: {
	        		        text: ''
	        		    },
	        		    tooltip: {
	        		        pointFormat: '{series.name}: <b>{point.y:.0f}</b>'
	        		    },
	        		    plotOptions: {
	        		        pie: {
	        		            allowPointSelect: true,
	        		            cursor: 'pointer',
	        		            dataLabels: {
	        		                enabled: true,
	        		                format: '<b>{point.name}</b>: {point.percentage:.1f} %',
	        		                style: {
	        		                    color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
	        		                }
	        		            }
	        		        }
	        		    },
	        		    series: [{
	        	            name: "Investigadores",
	        	            colorByPoint: true,
	        	            data: res
	        	        }]
	        		});
	                  
	        	 
	        	 var res2 = getData(json, 'nivelAcademico')
	        	 console.log(res2);
	        	 Highcharts.chart('pie-formacion', {
	        		    chart: {
	        		        plotBackgroundColor: null,
	        		        plotBorderWidth: null,
	        		        plotShadow: false,
	        		        type: 'pie'
	        		    },
	        		    title: {
	        		        text: ''
	        		    },
	        		    tooltip: {
	        		        pointFormat: '{series.name}: <b>{point.y:.0f}</b>'
	        		    },
	        		    plotOptions: {
	        		        pie: {
	        		            allowPointSelect: true,
	        		            cursor: 'pointer',
	        		            dataLabels: {
	        		                enabled: true,
	        		                format: '<b>{point.name}</b>: {point.percentage:.1f} %',
	        		                style: {
	        		                    color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
	        		                }
	        		            }
	        		        }
	        		    },
	        		    series: [{
	        	            name: "Investigadores",
	        	            colorByPoint: true,
	        	            data: res2
	        	        }]
	        		});
	        	 
	        	 
	        	 $('#tabla_integrantes tbody').on('click', 'tr', function () {
	        		    var data = tabla_integrantes.row( this ).data();
	        		    window.location.href="../home.html"+"?id="+data.id+"&type=i";
	        		  });
	         		}
	        	 }); 
	  }





});


function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
    results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
  }

function llenarLista(data, tipo){
	var i;
	if(tipo =='f'){
		for(i=0; i<data.length; i++){	
			 $('#miembros').append(
					    $('<li>').addClass('cards-item ci-'+calcularEspacio(data.length)).append(
					    	$('<div>').addClass('card ').append(
					    		$('<a>').addClass('card-container').attr('href',location.origin + location.pathname + '?id='+data[i].id+'&type='+tipo).append(
					    		$('<div>').addClass('card-title-container-s').append(
					            $('<h3>').addClass('card-title-s').append(data[i].nombre)		
					))).append(
				            $('<div>').addClass('card-bar card-'+data[i].id)
		            ))); 
			 
			
		 }
	}else if(tipo == 'p'){
		for(i=0; i<data.length; i++){			
			 $('#miembros').append(
					    $('<li>').addClass('cards-item ci-'+ calcularEspacio(data.length)).append(
					    	$('<div>').addClass('card ').append(
					    		$('<a>').addClass('card-container').attr('href',location.origin + location.pathname + '?id='+data[i].id+'&type='+tipo).append(
					    		$('<div>').addClass('card-title-container-s').append(
					            $('<h3>').addClass('card-title-s').append(data[i].nombre)
					))).append(
				            $('<div>').addClass('card-bar card-'+(data[i].facultad.id))
					)));    
		 }
	} else if (tipo == 'g'){		
		for(i=0; i<data.length; i++){			
			 $('#miembros').append(
					    $('<li>').addClass('cards-item ci-'+ calcularEspacio(data.length)).append(
					    	$('<div>').addClass('card card-').append(
					    		$('<a>').addClass('card-container').attr('href',location.origin + location.pathname + '?id='+data[i][0].id+'&type='+tipo).append(
					    		$('<div>').addClass('card-title-container-s').append(
					            $('<h3>').addClass('card-title-s').append(data[i][0].nombre)
					))).append(
				            $('<div>').addClass('card-bar card-'+(data[i][1].facultad.id))
					))); 
	}
	 
} else if (tipo == 'c'){		
	console.log(data);
	for(i=0; i<data.length; i++){			
		 $('#miembros').append(
				    $('<li>').addClass('cards-item ci-'+ calcularEspacio(data.length)).append(
				    	$('<div>').addClass('card card-').append(
				    		$('<a>').addClass('card-container').attr('href',location.origin + location.pathname + '?id='+data[i].id+'&type=g').append(
				    		$('<div>').addClass('card-title-container-s').append(
				            $('<h3>').addClass('card-title-s').append(data[i].nombre)
				))).append(
			            $('<div>').addClass('card-bar card-'+(data[i].centro.facultad.id))
				))); 
}

} 
}

function calcularEspacio(tamanio){
	var i;
	for (i=5; i>1 ; i--){
		if((tamanio%i)==0){
			return i;
		}
	}
	return calcularEspacio(tamanio+1);
}


function mostrarTabla(data, json){
	if(data.tipoProduccion.id==3){
		 $("#tabla_reporte>thead>tr").append("<th>ISSN/ISBN</th>");
		 $('#tabla_reporte').DataTable( {
			    data: json,
			      rowId: 'id',
			      columns: [
			      { data: "id" , visible:false},
			      { data: "referencia" } ,
			      { data: "autores" } ,
			      { data: "anio" },
			      { data: "identificador" } 
			      ]
			    } );
	 }else{
		 $('#tabla_reporte').DataTable( {
			    data: json,
			      rowId: 'id',
			      columns: [
			      { data: "id" , visible:false},
			      { data: "referencia" } ,
			      { data: "autores" } ,
			      { data: "anio" }
			      ]
			    } );
	 }
}

function mostrarGraficoBarras(data, json){
	var nombre = data.nombre;
	var datos = getData(json, 'anio');
	
	var labels = datos.labels;
	var data = datos.data;
	
	Highcharts.chart('barras-anio', {
	    chart: {
	        type: 'column'
	    },
	    title: {
	        text: ''
	    },
	    xAxis: {
	        type: 'category',
	        labels: {
	            rotation: -45,
	            style: {
	                fontSize: '13px',
	                fontFamily: 'Helvetica Neue, sans-serif'
	            }
	        }
	    },
	    yAxis: {
	        min: 0,
	        title: {
	            text: 'Producciones Científicas'
	        }
	    },
	    legend: {
	        enabled: false
	    },
	    tooltip: {
	        pointFormat: 'Producciones científicas: <b>{point.y:.0f}</b>'
	    },
	    series: [{
	        name: 'Producciones científicas',
	        data: datos
	    }]
	});
}

function getData(json, key){
	var arrayAux = [];
    var arrayAnios = [];
    var labels = [];
    var data = [];
    arrayAux= json;
    var i;
    for(i=0;i<arrayAux.length;i++){
      var aux = arrayAux[i];
      arrayAnios.push(aux[key]);
    }
    arrayAnios.sort();

    var current = null;
    var cnt = 0;
    
    for (var i = 0; i <= arrayAnios.length; i++) {
        if (arrayAnios[i] != current) {
            if (cnt > 0) {
            	labels.push(current);
                data.push(cnt);
            }
            current = arrayAnios[i];
            cnt = 1;
        } else {
            cnt++;
        }
    }
    var res= [];
    for(var i=0; i < labels.length; i++) {
        res.push({
            name: labels[i],
            y: data[i]           
        });        
    }  
    
    return res;
}

})(jQuery); // End of use strict
