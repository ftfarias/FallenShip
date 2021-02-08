

const app = Vue.createApp({
  data() {
    return {
      modules: {
        g1: {
          title: 'Emergency Generator',
          update: () => { this.energy = this.energy + 10 },
          status: "active"
        }
      },
      message: "",
      actions: [],
      counter: 0,
      hp: 100,
      showBackpack: true,
      cargo: [],
      shipModules: [],
      energy: 130.0,
      maxEnergy: 200.0,
      deltaEnergy: 10.0,
      minerals: 5.0,
      lifeSupport: 76,
      showStatus: false,
      showCommands: false,
      crap_car: {
        title: "CRAP Cars",
        description: "Simple, small autonomous vehicles that can perform a lot of simple actions",
        current_action: "",
        current_percent: 0,
        active: false,
        buttons: [{ action: this.crapCarStartGetMinerals, text: 'Get Minerals'}],
        update() {
          if (this.active) {
            this.current_percent = this.current_percent + 15;
          }
          if (this.current_percent >= 100) {
            this.addMinerals(100);
            this.current_percent = 0;
            this.active = false;
          }

        }
      },
      story: {
        0: {
          text: `My head hurt.... I was analysing this new planet when something hit my ship...  I could barely land without became a ball of fire.... Now all systems are dead...`,
          actions: [{ text: "Activate emergency systems", action: () => { this.showStatus = true; this.goTo(10) } }]
        },
        10: {
          text: `Ok... Good news: I'm alive... Bad news: 87.9% of my ship is destroyed, including most of computers and AI systems.... Gosh, I will need to do everything on manual...`,
          actions: [{ text: "Change systems to manual operation", action: () => { this.showCommands = true; this.goTo(20) } }]
        },
        20: {
          text: `Humm... I have some CRAP ([C]ommandable [R]etail [A]ll [P]urpose ) cars... I think I can use it to get more minerals for repairs!`,
          actions: [{
            text: "Activate CRAP cars systems!", action: () => {
              this.shipModules.push(this.crap_car);
              this.goTo(30);
            }
          }]
        },
        30: {
          text: `Ok... let's get some kilos of minerals to start...`,
          actions: []
        },
      }
    }
  },
  mounted() {
    setInterval(() => {
      this.update()
    }, 1000);
    this.goTo(0);
  },
  methods: {
    update() {
      this.counter++;
      this.energy = Math.min(this.energy, this.maxEnergy);
      this.crap_car.update()
    },

    goTo(pos) {
      console.log('Go To ' + pos);
      this.message = this.story[pos].text;
      this.actions = this.story[pos].actions;
    },

    crapCarStartGetMinerals() {
      console.log('crapCarStartGetMinerals')
      this.crap_car.active = true;
    },
    
    addMinerals(value) {
      this.minerals = this.minerals + value;
    }

  }
})

// Define a new component called todo-item
app.component('ship-module', {
  props: ['title', 'buttons', 'description','current_action', 'current_percent'],
  template: `<div class="card">
  <header class="card-header">
    <p class="card-header-title">
      {{title}}
    </p>
    <button class="card-header-icon" aria-label="more options">
      <span class="icon">
        <i class="fas fa-angle-down" aria-hidden="true"></i>
      </span>
    </button>
  </header>
  <div class="card-content">
    <div class="content">
      {{description}}
      <br/>
      {{current_action}}
    </div>
    <progress class="progress" v-bind:value=current_percent max="100">{{current_percent}}%</progress>
    </div>
  <footer v-for="a in buttons" class="card-footer">
    <a href="#" v-on:click=a.action v-html=a.text class="card-footer-item" ></a>
    

  </footer>
</div>`
})
