require "sinatra"
require "mysql2"
require "json"



#control de acceso bloqeo pagina web.
#configure do
#  enable :cross_origin
#end

#control de acceso bloqeo pagina web.
#options '/*' do
#    content_type :json
#    headers['Access-Control-Allow-Origin'] = "*"
#    headers['Access-Control-Allow-Methods'] = "GET, POST, PUT, DELETE, OPTIONS"
#    headers['Access-Control-Allow-Headers'] ="accept, authorization, origin"
#end


db = Mysql2::Client.new(:host => "mdb-test.c6vunyturrl6.us-west-1.rds.amazonaws.com", :username => "bsale_test", :password => "bsale_test", :database => "bsale_test")

#before do
#    content_type :json
##    headers['Access-Control-Allow-Methods'] = 'GET, POST, PUT, DELETE, OPTIONS'
#    headers['Access-Control-Allow-Origin'] = '*'
#    headers['Access-Control-Allow-Headers'] = 'accept, authorization, origin'
#end


#aca hay que mostrar las rutas
#la prueba dice listar por categoria


#filtro para productos productos.
#get '/products' do # si viene parametro concatenar con un where para hacer filtro de producc to
#    product_filter = ""
##    if params["name"]  != nil
#       product_filter = "name like '%#{params["name"]}%'"
#    end   
#    product_query = "select * from product where  #{product_filter}"
#    puts product_query
#    query_products = db.query(product_query) 
#    product_to_json(query_products)
#end

#select filtro categoria y productoss pagina inicial
get '/' do 
    query_categories = db.query 'SELECT category.id, category.name as categoria, product.name, product.url_image, product.price, product.discount from product INNER JOIN category ON product.category = category.id;'
    product_to_json(query_categories)
end

#filtro para categorias.
get '/categories' do 
    query_categories = db.query 'SELECT * from  category;'
    product_to_json(query_categories)
end

def product_to_json(array)
    json_array = []
    array.each do |element|
        json_array.push(element)
        
    end
    return JSON.generate({ :data => json_array})
end



