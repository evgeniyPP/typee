var app = new Vue({
  el: '#app',
  data: {
    done: false,
    input: '',
    link: null,
    hideButton: false
  },
  methods: {
    async generate() {
      this.hideButton = true;
      const text = this.input;
      const res = await fetch('https://typeme-1388e.firebaseio.com/links.json', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text })
      });
      const data = await res.json();
      this.link = `http://localhost:5001/x/${data.name}`;
      this.done = true;
    },
    copy() {
      const link = this.$refs.link;
      link.select();
      link.setSelectionRange(0, 99999);
      document.execCommand('copy');
    }
  }
});
