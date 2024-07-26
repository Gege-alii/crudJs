document.addEventListener('DOMContentLoaded', () => {
    AOS.init();
    const postForm = document.getElementById('postForm');
    const postsContainer = document.getElementById('posts');
    const searchInput = document.getElementById('search');
    let posts = JSON.parse(localStorage.getItem('posts')) || [];

    function renderPosts(filteredPosts = posts) {
      postsContainer.innerHTML = '';
      filteredPosts.forEach((post, index) => {
        const postCard = document.createElement('div');
        postCard.className = 'col-md-4';
        postCard.innerHTML = `
          <div class="card" data-aos="fade-up"  data-aos-duration="2500">
            <img src="${post.image}" class="card-img-top" alt="${post.title}">
            <div class="card-body">
              <h5 class="card-title">${post.title}</h5>
              <p class="card-text">${post.content}</p>
              <button class="btn btn-primary px-4" onclick="editPost(${index})">Edit</button>
              <button class="btn btn-danger px-4" onclick="deletePost(${index})">Delete</button>
            </div>
          </div>
        `;
        postsContainer.appendChild(postCard);
      });
    }

    postForm.addEventListener('submit', (event) => {
      event.preventDefault();
      const title = document.getElementById('title').value;
      const content = document.getElementById('content').value;
      const image = document.getElementById('image').value;

      posts.push({ title, content, image });
      localStorage.setItem('posts', JSON.stringify(posts));
      renderPosts();
      postForm.reset();
    });

    window.editPost = (index) => {
      const post = posts[index];
      document.getElementById('title').value = post.title;
      document.getElementById('content').value = post.content;
      document.getElementById('image').value = post.image;

      postForm.onsubmit = (event) => {
        event.preventDefault();
        posts[index] = {
          title: document.getElementById('title').value,
          content: document.getElementById('content').value,
          image: document.getElementById('image').value
        };
        localStorage.setItem('posts', JSON.stringify(posts));
        renderPosts();
        postForm.reset();
        postForm.onsubmit = addPost;
      };
    };

    window.deletePost = (index) => {
      posts.splice(index, 1);
      localStorage.setItem('posts', JSON.stringify(posts));
      renderPosts();
    };

    searchInput.addEventListener('input', (event) => {
      const searchText = event.target.value.toLowerCase();
      const filteredPosts = posts.filter(post => post.title.toLowerCase().includes(searchText));
      renderPosts(filteredPosts);
    });

    renderPosts();
  });