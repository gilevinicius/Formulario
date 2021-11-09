var vm = new Vue({
    vuetify: new Vuetify(),
    el: "#app",
    data: function data() {
      return {
        oportunidades:[{text:"Desenvolvedor", value: "Desenvolvedor (TI)"}, 
        {text:"Administrativo", value: "Administrativo (ADM)"}, 
        {text:"Suporte", value: "Suporte (SPT)"},] ,
        
        valid:true,
        validacao: null,
        validacaoNome: null,
        validacaoSenha: null,
        
        pessoa: {
          nome: "",
          senha: "",
          genero: "",
          descricao: "",
          oportunidade: "",
          possuiD: false,
          possuiV: false,
        },
        
        dialog:false,
        dialogFinal:false,
        aviso: "Preencha todos os campos!"
      }
    },
    
    methods: {

      validar: function () {
        if (this.pessoa.nome != "" &&
            this.pessoa.senha != "" &&
            this.pessoa.genero != "" &&
            this.pessoa.descricao != "" &&
            this.pessoa.oportunidade != "") 
            this.validado()
        else this.nvalidado()
      },
      
      validado: function () {
        this.aviso = "Campos preenchidos!"
        var mensagem = document.querySelector(".aviso")
        mensagem.classList.add("aviso2")
      },
      
      nvalidado: function () {
        this.aviso = "Preencha todos os campos!"
        var mensagem = document.querySelector(".aviso")
        mensagem.classList.remove("aviso2")
      },

      resetar: function() {
        this.pessoa.nome = ""
        this.pessoa.senha = ""
        this.pessoa.genero = ""
        this.pessoa.descricao = ""
        this.pessoa.oportunidade = ""
        this.pessoa.possuiD = false
        this.pessoa.possuiV = false
        this.nvalidado()
      },

      confirmacao: function () {
        this.dialog = true
        this.validacao = null
      },

      confirmar: function() {
        
        const autenticacao = fetch("autenticacao.txt")
        autenticacao.then(res => {
          res.text().then((body)=>{
            var nome = body.substring(0, 4);
            var senha = body.substring(5);
            
            if (this.pessoa.nome == nome && this.pessoa.senha == senha) {
              this.validacaoNome = true
              this.validacaoSenha = true
              this.autenticacao()
            }
            else {
              this.validacaoNome = false
              this.validacaoSenha = false
              this.autenticacao()
            }
          })
        })
        
      },

      autenticacao: function() {
        if(this.validacaoSenha == true && this.validacaoNome == true) {
          this.validacao = true
          this.dialogFinal = true
          this.dialog = false
        }
        else this.validacao = false
      },

      dialogFinalF() {
        this.dialogFinal = false
        this.validacao = null
        this.resetar()
      }
    },
  })
  