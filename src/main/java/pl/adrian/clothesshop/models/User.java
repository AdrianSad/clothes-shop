package pl.adrian.clothesshop.models;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.GeneratorType;

import javax.persistence.*;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

@Entity
@Getter
@Setter
@NoArgsConstructor
@Table(name = "users", uniqueConstraints = {
        @UniqueConstraint(columnNames = "username"),
        @UniqueConstraint(columnNames = "email")
})
public class User implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_id")
    private Long id;

    @NotBlank
    @Size(max = 30)
    @Column(name = "username")
    private String username;

    @NotBlank
    @Size(max = 50)
    @Email
    @Column(name = "email")
    private String email;

    @NotBlank
    @Size(max = 120)
    @Column(name = "password")
    private String password;

    @Size(max = 15)
    @Column(name = "phone")
    private String phone;

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(	name = "users_roles",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "role_id"))
    private Set<UserRole> roles = new HashSet<>();

    @OneToMany(mappedBy = "user",
            cascade = CascadeType.ALL,
            orphanRemoval = true)
    private Set<Product> products = new HashSet<>();

    public User(String username, String email, String password){
        this.username = username;
        this.email = email;
        this.password = password;
    }
}
