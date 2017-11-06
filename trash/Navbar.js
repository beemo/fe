Vue.component('navbar-component', {
  template: `<div class="create">
<b-navbar class="navtop" toggleable="md" type="light" variant="info">

      <b-nav-toggle target="nav_collapse"></b-nav-toggle>

      <b-navbar-brand href="/">BBQ Journal</b-navbar-brand left>

      <b-nav is-nav-bar class="ml-auto">

        <b-nav-item-dropdown text="Links" color="orange" right>
          <b-dropdown-item href="/create">Create</b-dropdown-item>
          <b-dropdown-item href="/list">Entries</b-dropdown-item>
          <b-dropdown-item href="/logout">Logout</b-dropdown-item>
        </b-nav-item-dropdown>

      </b-nav>

    </b-navbar>
</div>`
})

new Vue({
  el: '#nav'
})
