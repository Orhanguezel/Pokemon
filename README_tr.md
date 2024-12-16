### **Pokemon Kartları**

Fetch API ve Pokemon API kullanarak bir **Pokemon arama motoru** oluşturun.

---

### **Görev**

[Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API) ve [Pokemon API](https://pokeapi.co/) kullanarak:

- Kullanıcının Pokemon araması yapabileceği bir web sitesi oluşturun. Kullanıcı, bir `<input />` alanı ve bir `<button>` ile sayfa üzerinde etkileşim kurabilmelidir.

---

### **Gereksinimler**

1. **Arama Alanı:**
   - Kullanıcının arama yapabilmesi için bir `<input />` alanı ekleyin.

2. **Buton:**
   - `<button>` butonu ekleyin. Butona tıklanınca aşağıdaki işlemleri yapmalı:
     - **`value` kontrolü:**  
       `<input />` alanının `value` değeri boşsa:
       - Kullanıcıya uyarı mesajı gösterin.
     - **API'ye İstek:**  
       - Eğer `value` boş değilse, Pokemon API'ye istek gönderin.
     - **Sonuçların Gösterilmesi:**  
       - API'den gelen verileri sayfada gösterin.

3. **Sonuç Gösterimi:**
   - Aşağıdaki özellikleri sayfada gösterin:
     - **name:** Pokemon adı
     - **front_default:** Pokemon resmi (image)
     - **stats:** Pokemon istatistikleri
     - **abilities:** Pokemon yetenekleri

4. **Kart Tasarımı:**
   - Sonuçları bir kart tasarımında gösterecek şekilde stil verin (CSS ile).

---

### **Beklenen Sonuç**

- Kullanıcı bir Pokemon aradığında, sonuç kart şeklinde aşağıdaki gibi görüntülenmelidir:

![Beklenen Sonuç](./reference.gif) 

---

### **İpuçları:**

- **API URL:**  
  Arama yaparken Pokemon API'nin şu uç noktasını kullanabilirsiniz:  
  ```
  https://pokeapi.co/api/v2/pokemon/{pokemon adı veya ID}
  ```

- **Örneğin:**
   - Pikachu için arama yapıyorsanız:  
     `https://pokeapi.co/api/v2/pokemon/pikachu`

---

Bu adımları tamamladıktan sonra, sayfa Pokemon arama işlevine sahip olacaktır.