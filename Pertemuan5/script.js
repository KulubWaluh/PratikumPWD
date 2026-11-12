var products = [
  {
    id: 1,
    nama: "NEGATIFA - TOMB | Tshirt Black",
    harga: 185000,
    stok: 20,
    gambar: "gambar1.jpg"
  },
  {
    id: 2,
    nama: "THE KICK - VOID | Tshirt Black",
    harga: 220000,
    stok: 14,
    gambar: "gambar2.jpg"
  },
  {
    id: 3,
    nama: "SATCF - DAD ROCK FOR LIFE | Tshirt Black",
    harga: 225000,
    stok: 5,
    gambar: "gambar3.jpg"
  },
  {
    id: 4,
    nama: "COLORCODE - HEAVY AT HEART | Tshirt Black",
    harga: 205000,
    stok: 4,
    gambar: "gambar4.jpg"
  },
  {
    id: 5,
    nama: "THE MILO - DON’T WORRY FOR BEING ALONE | Tshirt Black",
    harga: 230000,
    stok: 7,
    gambar: "gambar5.jpg"
  },
  {
    id: 6,
    nama: "NOD - PEACE | Tshirt Black",
    harga: 185000,
    stok: 5,
    gambar: "gambar6.jpg"
  },
  {
    id: 7,
    nama: "THE SIGIT - CONUNDRUM | Tshirt Black",
    harga: 185000,
    stok: 6,
    gambar: "gambar7.jpg"
  }
];

var cart = [];

function formatRupiah(angka) {
  return "Rp " + angka.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

function renderProductList() {
  var productContainer = document.getElementById("product-list");
  if (!productContainer) return;

  productContainer.innerHTML = "";

  for (var i = 0; i < products.length; i++) {
    var item = products[i];

    var card = document.createElement("div");
    card.className = "product-card";
    card.setAttribute("data-id", item.id);

    var imgWrapper = document.createElement("div");
    imgWrapper.className = "product-img-wrapper";

    var img = document.createElement("img");
    img.className = "product-image";
    img.src = item.gambar;
    img.alt = item.nama;
    imgWrapper.appendChild(img);

    var stockBadge = document.createElement("span");
    stockBadge.className = "badge-stock";
    stockBadge.id = "stock-badge-" + item.id;
    var stockText = document.createTextNode("Sisa Stok: " + item.stok);
    stockBadge.appendChild(stockText);
    imgWrapper.appendChild(stockBadge);

    card.appendChild(imgWrapper);

    var productInfo = document.createElement("div");
    productInfo.className = "product-info";

    var title = document.createElement("h3");
    title.className = "product-title";
    var titleText = document.createTextNode(item.nama);
    title.appendChild(titleText);
    productInfo.appendChild(title);

    var price = document.createElement("p");
    price.className = "product-price";
    var priceText = document.createTextNode(formatRupiah(item.harga));
    price.appendChild(priceText);
    productInfo.appendChild(price);

    var btnAdd = document.createElement("button");
    btnAdd.className = "btn-add-cart";
    btnAdd.setAttribute("data-id", item.id);
    var btnText = document.createTextNode("🛒 Tambah ke Keranjang");
    btnAdd.appendChild(btnText);
    productInfo.appendChild(btnAdd);

    card.appendChild(productInfo);

    productContainer.appendChild(card);
  }
}

$(document).ready(function() {

  renderProductList();

  function getRemainingStock(productId) {
    var product = products.find(function(p) { return p.id === productId; });
    if (!product) return 0;

    var cartItem = cart.find(function(c) { return c.id === productId; });
    var inCart = cartItem ? cartItem.jumlah : 0;
    return product.stok - inCart;
  }

  function updateProductStockBadges() {
    products.forEach(function(item) {
      var remaining = getRemainingStock(item.id);
      var $badge = $("#stock-badge-" + item.id);
      var $btn = $('.product-card[data-id="' + item.id + '"] .btn-add-cart');

      if (remaining <= 0) {
        $badge.text("Stok Habis!").removeClass("stock-low").addClass("stock-empty");
        $btn.addClass("disabled").text("Stok Habis");
      } else if (remaining <= 2) {
        $badge.text("Sisa " + remaining + " item!").removeClass("stock-empty").addClass("stock-low");
        $btn.removeClass("disabled").text("🛒 Tambah ke Keranjang");
      } else {
        $badge.text("Sisa Stok: " + remaining).removeClass("stock-low stock-empty");
        $btn.removeClass("disabled").text("🛒 Tambah ke Keranjang");
      }
    });
  }

  function updateCartTotals() {
    var totalItems = 0;
    var totalPrice = 0;

    cart.forEach(function(item) {
      totalItems += item.jumlah;
      totalPrice += (item.harga * item.jumlah);
    });

    $("#total-items").text(totalItems + " item");
    $("#total-price").text(formatRupiah(totalPrice));
    $("#cart-badge").text(totalItems);

    if (cart.length === 0) {
      $("#empty-cart-message").show();
      $("#cart-items").hide();
    } else {
      $("#empty-cart-message").hide();
      $("#cart-items").show();
    }

    updateProductStockBadges();
  }

  updateCartTotals();

  $("#search-input").on("keyup input", function() {
    var keyword = $(this).val().toLowerCase().trim();
    var matchCount = 0;

    $(".product-card").each(function() {
      var title = $(this).find(".product-title").text().toLowerCase();
      var isMatch = title.indexOf(keyword) > -1;

      $(this).toggle(isMatch);

      if (isMatch) matchCount++;
    });

    $("#no-products-msg").toggle(matchCount === 0);

    if (keyword !== "") {
      $("#search-status-text").text("Ditemukan " + matchCount + " produk pakaian");
    } else {
      $("#search-status-text").text("");
    }
  });

  function toggleCartPanel() {
    $("#cart-panel-overlay").fadeToggle(250);
  }

  $("#cart-toggle-btn, #close-cart-btn").on("click", function() {
    toggleCartPanel();
  });

  $("#cart-panel-overlay").on("click", function(e) {
    if (e.target === this) {
      toggleCartPanel();
    }
  });

  $(document).on("click", ".btn-add-cart", function() {
    var productId = parseInt($(this).attr("data-id"));
    var product = products.find(function(p) { return p.id === productId; });

    if (!product) return;

    var remaining = getRemainingStock(productId);

    if (remaining <= 0) {
      alert("⚠️ Maaf, stok pakaian '" + product.nama + "' sudah habis!");
      return;
    }

    var existingItem = cart.find(function(c) { return c.id === productId; });

    if (!existingItem) {
      cart.push({
        id: product.id,
        nama: product.nama,
        harga: product.harga,
        jumlah: 1
      });

      var $newItem = $(
        '<li class="cart-item" data-id="' + product.id + '" style="display: none;">' +
          '<div class="cart-item-info">' +
            '<span class="cart-item-name">' + product.nama + '</span>' +
            '<span class="cart-item-price">' + formatRupiah(product.harga) + '</span>' +
            '<div class="cart-item-qty-row">' +
              '<span class="cart-item-qty-badge">Qty: <span class="item-qty-val">1</span></span>' +
              '<span class="cart-item-subtotal">Subtotal: <span class="item-subtotal-val">' + formatRupiah(product.harga) + '</span></span>' +
            '</div>' +
          '</div>' +
          '<button class="btn-remove-item" data-id="' + product.id + '" title="Hapus dari keranjang">&times;</button>' +
        '</li>'
      );

      $("#cart-items").append($newItem);

      $newItem.fadeIn(300);

    } else {
      existingItem.jumlah += 1;

      var $existingRow = $('#cart-items .cart-item[data-id="' + product.id + '"]');
      $existingRow.find(".item-qty-val").text(existingItem.jumlah);
      $existingRow.find(".item-subtotal-val").text(formatRupiah(existingItem.jumlah * existingItem.harga));
    }

    updateCartTotals();
  });

  $(document).on("click", ".btn-remove-item", function() {
    var productId = parseInt($(this).attr("data-id"));
    var itemToRemove = cart.find(function(c) { return c.id === productId; });
    var itemName = itemToRemove ? itemToRemove.nama : "pakaian ini";

    var yakin = confirm("Apakah Anda yakin ingin menghapus \"" + itemName + "\" dari keranjang belanja?");

    if (yakin) {
      var $cartRow = $(this).closest(".cart-item");

      $cartRow.fadeOut(300, function() {
        $(this).remove();

        cart = cart.filter(function(c) { return c.id !== productId; });

        updateCartTotals();
      });
    }
  });

  $("#empty-cart-btn").on("click", function() {
    if (cart.length === 0) {
      alert("Keranjang belanja Anda sudah kosong.");
      return;
    }

    var yakin = confirm("Apakah Anda yakin ingin mengosongkan seluruh isi keranjang belanja?");

    if (yakin) {
      $("#cart-items").fadeOut(250, function() {
        $(this).empty().show();

        cart = [];

        updateCartTotals();
      });
    }
  });

  $("#checkout-btn").on("click", function() {
    if (cart.length === 0) {
      alert("⚠️ Keranjang belanja Anda masih kosong! Silakan pilih pakaian terlebih dahulu.");
      return;
    }

    var namaPembeli = prompt("Pesanan siap diproses! Silakan masukkan Nama Lengkap Pembeli:");

    if (namaPembeli === null) {
      return;
    }

    namaPembeli = namaPembeli.trim();

    if (namaPembeli === "") {
      alert("⚠️ Nama pembeli tidak boleh kosong. Silakan ulangi checkout.");
      return;
    }

    var purchasedItems = JSON.parse(JSON.stringify(cart));
    var grandTotal = 0;

    var $summaryTableBody = $("#summary-items-list");
    $summaryTableBody.empty();

    purchasedItems.forEach(function(item, index) {
      var subtotal = item.harga * item.jumlah;
      grandTotal += subtotal;

      var rowHtml = 
        '<tr>' +
          '<td>' + (index + 1) + '</td>' +
          '<td><strong>' + item.nama + '</strong></td>' +
          '<td>' + formatRupiah(item.harga) + '</td>' +
          '<td>' + item.jumlah + ' item</td>' +
          '<td><strong>' + formatRupiah(subtotal) + '</strong></td>' +
        '</tr>';

      $summaryTableBody.append(rowHtml);
    });

    var now = new Date();
    var invoiceNo = "INV/" + now.getFullYear() + (now.getMonth() + 1).toString().padStart(2, '0') + now.getDate().toString().padStart(2, '0') + "/" + Math.floor(1000 + Math.random() * 9000);
    var dateString = now.toLocaleDateString("id-ID", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    });

    $("#summary-buyer-name").text(namaPembeli);
    $("#summary-date").text(dateString);
    $("#summary-invoice").text(invoiceNo);
    $("#summary-total-price").text(formatRupiah(grandTotal));

    $("#cart-items").empty();
    cart = [];
    updateCartTotals();

    $("#cart-panel-overlay").fadeOut(250);

    $("#order-summary-section").slideDown(400);

    $("html, body").animate({
      scrollTop: $("#order-summary-section").offset().top - 30
    }, 500);

    alert("⚡ Terima kasih, " + namaPembeli + "! Pesanan Anda berhasil diproses.");
  });

  $("#btn-close-summary").on("click", function() {
    $("#order-summary-section").slideUp(350);
    $("html, body").animate({
      scrollTop: $(".main-catalog").offset().top - 40
    }, 400);
  });

  $("#btn-slide-left").on("click", function() {
    var $slider = $("#product-list");
    $slider.animate({
      scrollLeft: $slider.scrollLeft() - 320
    }, 300);
  });

  $("#btn-slide-right").on("click", function() {
    var $slider = $("#product-list");
    $slider.animate({
      scrollLeft: $slider.scrollLeft() + 320
    }, 300);
  });

  $("#btn-toggle-layout").on("click", function() {
    var $list = $("#product-list");
    var isSlider = $list.hasClass("product-slider");

    if (isSlider) {
      $list.removeClass("product-slider").addClass("product-grid");
      $(".slide-arrows-group").hide();
      $("#layout-icon").text("↔");
      $("#layout-text").text("Mode Geser");
      $("#catalog-subtitle").text("Tampilan grid kolom — seluruh produk tertata rapi");
    } else {
      $list.removeClass("product-grid").addClass("product-slider");
      $(".slide-arrows-group").show();
      $("#layout-icon").text("⊞");
      $("#layout-text").text("Mode Grid");
      $("#catalog-subtitle").text("Pakaian berjejer ke samping — gunakan tombol geser atau usap untuk melihat koleksi lainnya");
    }
  });

});