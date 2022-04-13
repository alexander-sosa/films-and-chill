package bo.edu.ucb.taller.films_and_chill.token.Model;

import java.io.Serializable;

public class RoleRequest implements Serializable{
    
    private static final long serialVersionUID = 5926468583005150707L;

    private Integer user_editor_id;
    private Integer user_editee_id;
    private Integer permission_id;

    public RoleRequest() 
    {

    }

    public RoleRequest(Integer user_editor_id, Integer user_editee_id, Integer permission_id) {
        this.user_editor_id = user_editor_id;
        this.user_editee_id = user_editee_id;
        this.permission_id = permission_id;
    }

    public Integer getUser_editor_id() {
        return this.user_editor_id;
    }

    public void setUser_editor_id(Integer user_editor_id) {
        this.user_editor_id = user_editor_id;
    }

    public Integer getUser_editee_id() {
        return this.user_editee_id;
    }

    public void setUser_editee_id(Integer user_editee_id) {
        this.user_editee_id = user_editee_id;
    }

    public Integer getPermission_id() {
        return this.permission_id;
    }

    public void setPermission_id(Integer permission_id) {
        this.permission_id = permission_id;
    }
}
