/*Lexico*/


%lex

%options case-insensitive

%%
\s+ 
"//".*          
[/][*][^*]*[*]+([^/*][^*]*[*]+)*[/] 


"public"        return 'RPUBLIC';           //Privacidad
"void"          return 'RVOID';
"class"         return 'RCLASS';
"interface"     return 'RINTERFACE';
"int"           return 'RINT';              //Tipos de datos
"double"        return 'RDOUBLE';   
"char"          return 'RCHAR';
"String"        return 'RSTRING';
"void"          return "RVOID";
"boolean"       return 'RBOOLEAN';
"return"        return "RRETURN";
"break"         return "RBREAK";
"continue"      return "RCONTINUE";
"while"         return "RWHILE";
"for"           return "RFOR";
"do"            return "RDO";
"this"          return "RTHIS";
"main"          return "main";
"if"            return "RIF";
"else"          return "RELSE";
"system"        return "RSYSTEM";
"out"           return "ROUT";
"print"         return "RPRINT";
"println"       return "RPRINTLN";
"static"        return "RSTATIC";
"args"          return "RARGS";
"main"          return "RMAIN";



"."             return "RPUNTO";
","             return "RCOMA";
":"             return "RDOSP";
";"             return "RPTCOMA";
"{"             return "RLLAVAP";
"}"             return "RLLAVCE";
"("             return "RPARAPE";
")"             return "RPARCER";
"["             return "RCORAP";
"]"             return "RCORCE";

"+"             return "RMAS";
"-"             return "RGUION";
"/"             return "RSLASH";
"*"             return "RAST";
"="             return "RASIG";

"&&"            return "RAND";
"||"            return "ROR";
">="            return "RMAYIQ";
"<="            return "RMENIQ";
"=="            return "REQUAL"; 
"!="            return "RDIF";
"!"             return "RNOT";
"^"             return "RXOR";
">"             return "RMYRQ";
"<"             return "RMNRQ";
"++"            return "RADD";
"--"            return "RSUST";

"true"          return "RTRUE";
"false"         return "RFALSE";
[0-9]+"."[0-9]+ return "RFLOAT";
[0-9]+\b        return "RENTERO";
\"[^\"]*\"      return "RCADENA";
"'"[^']"'"      return "RCHAR";
([a-zA-Z])[A-Za-z0-9_]* return 'RIDENTIFICADOR';

<<EOF>> return 'EOF';
{
    console.log("Error Lexico: "+yytext+". Linea: "+yylloc.first_line+" Columna"+yylloc.first_line);
}


/lex

%left 'ROR'
%left 'RAND'
%left 'REQUAL' 'RDIF'
%left 'RMNRQ' 'RMYRQ' 'RMAYIQ' 'RMENIQ'
%left 'RMAS' 'RGUION'
%left 'RAST' 'RSLASH'
%right 'UMENOS' 'UMAS'

%start INICIO

%%

INICIO
        : A EOF{
            //Aca voy a enviar la traduccion
            return $1
        }
;

A
    : A CLASE
    | CLASE
    |           //VACIO

;

CLASE
    :RPUBLIC RINTERFACE RIDENTIFICADOR BLOQUEINTERFACE
    |RPUBLIC RCLASS RIDENTIFICADOR BLOQUECLASE
;

BLOQUECLASE
    :RLLAVAP INSTRUCCIONESC RLLAVCE
    |RLLAVAP RLLAVCE
;

BLOQUEINTERFACE
    :RLLAVAP INSTRUCCIONESIF RLLAVCE
    |RLLAVAP RLLAVCE
;

//TODA ESTA PARTE ES EXCLUSIVAMENTE PARA EL USO DE LA CLASE ¡NO DE LA INTERFAZ! (aunque mas de algo se puede utilizar)

INSTRUCCIONESC
    :INSTRUCCIONESC INSTRUCCIONC
    |INSTRUCCIONC
;


INSTRUCCIONC
    :RPUBLIC TIPO DECLARACIONES RPTCOMA
    |ASIGNACION RPTCOMA
    |DECLAMETPC RLLAVAP INSTRUCCIONES RLLAVCE
    |DECLAMETPC RLLAVAP RLLAVCE
    |DECLMAIN RLLAVAP INSTRUCCIONES RLLAVCE INSTRUCCIONESCC
;

DECLMAIN
    :RPUNTO RSTATIC RVOID RMAIN RPARAPE RSTRING RCORAP RCORCE RARGS RPARCER
;

INSTRUCCIONESCC
    :INSTRUCCIONESCC INSTRUCCIONCC
    |INSTRUCCIONCC
;
INSTRUCCIONCC
    :RPUBLIC TIPO DECLARACIONES RPTCOMA
    |ASIGNACION RPTCOMA
    |DECLAMETPC RLLAVAP INSTRUCCIONES RLLAVCE
    |DECLAMETPC RLLAVAP RLLAVCE
;
DECLAMETPC
    : RPUBLIC TIPOM RIDENTIFICADOR RPARAPE PARAMS RPARCER
    | RPUBLIC RIDENTIFICADOR RPARAPE PARAMS RPARCER
;

//ESTA PRODUCCION PUEDE SER UTILIZADA TAMBIEN POR INTERFACES
PARAMS
    :PARAMS RCOMA PARAM
    |PARAM
    | //mETODO VACIO
;

PARAM
    :TIPO RIDENTIFICADOR
;

INSTRUCCIONES
    :INSTRUCCIONES INSTRUCCION
    |INSTRUCCION
;

INSTRUCCION
    :TIPO DECLARACIONES RPTCOMA
    |ASIGNACION RPTCOMA
    |IFF
    |FORF
    |FWHILE
    |FPRINT
    |FLLAMADO RPTCOMA //LLAMADO DE FUNCIONES
    |FRETURN
    |FBREAK
    |FCONTINUE

;

BLOQUESENT
    :RLLAVAP INSTRUCCIONES RLLAVCE
    |RLLAVAP RLLAVCE
;

DECLARACIONES
    :DECLARACIONES RCOMA DECLARACION
    |DECLARACION
;

DECLARACION
    :RIDENTIFICADOR
    |RIDENTIFICADOR RASIG EXPRESION
;

ASIGNACION
    :RIDENTIFICADOR RASIG EXPRESION
;

FLLAMADO
    :RIDENTIFICADOR RPARAPE PARAMSRS RPARCER
;

PARAMSRS
    :PARAMSRS PARAMSR
    |PARAMSR
    |
;

PARAMSR
    :RCADENA
    |RTRUE
    |RENTERO
    |RFLOAT
    |RCADENA
    |RCHAR
    |RIDENTIFICADOR
;

IFF
    :RIF RPARAPE EXPRESION RPARCER BLOQUESENT 
    |RIF RPARAPE EXPRESION RPARCER BLOQUESENT RELSE BLOQUESENT
    |RIF RPARAPE EXPRESION RPARCER RELSE IFF
;

FORF
    : RFOR RPARAPE DECLARACION RPTCOMA EXPRESION RPTCOMA EXPRESION RPARCER BLOQUESENT
;

FWHILE
    :RWHILE RPARAPE EXPRESION RPARCER BLOQUESENT
    |RDO BLOQUESENT RWHILE RPARAPE EXPRESION RPARCER RPTCOMA
;

FPRINT
    :RSYSTEM RPUNTO ROUT RPUNTO RPRINTLN RPARAPE EXPRESION RPARCER RPTCOMA
    |RSYSTEM RPUNTO ROUT RPUNTO RPRINT RPARAPE EXPRESION RPARCER RPTCOMA
;

FRETURN
    :RRETURN EXPRESION RPTCOMA
    |RRETURN RPTCOMA
;

FBREAK
    :RBREAK RPTCOMA
;

FCONTINUE
    :RCONTINUE RPTCOMA
;


