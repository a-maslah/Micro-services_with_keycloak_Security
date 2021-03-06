package ma.enset.productsapp.web;

import lombok.Data;
import ma.enset.productsapp.repositories.ProductRepository;
import org.keycloak.adapters.springsecurity.client.KeycloakRestTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.hateoas.PagedModel;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class ProductController{

    @Autowired
    private KeycloakRestTemplate keycloakRestTemplate;

    @Autowired
    private ProductRepository productRepository;

    @GetMapping("/")
    public String index(){
        return "index";
    }
    @GetMapping("/products")
    public String products(Model model){
        model.addAttribute("products",productRepository.findAll());
        return "products";
    }
    @GetMapping("/suppliers")
    public String suppliers(Model model){
        //authorisation header is added by keycload restTemplate
       PagedModel<Supplier> pageSuppliers= keycloakRestTemplate.getForObject("http://localhost:8083/suppliers", PagedModel.class);
        model.addAttribute("suppliers",pageSuppliers);
        return "suppliers";
    }


    @ExceptionHandler(Exception.class)
    public String exceptionHandler(Exception e,Model model)
    {
        model.addAttribute("error","Not Authorized");
        return "errors";
    }

}

@Data
class Supplier{

    private Long id;
    private String name;
    private String email;
}
