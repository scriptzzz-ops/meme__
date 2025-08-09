@@ .. @@
 export default defineConfig({
   plugins: [react()],
   server: {
     proxy: {
       "/health": "http://localhost:3001",
-      "/generate-meme": "http://localhost:3001"
+      "/generate-image": "http://localhost:3001"
     }
   }
 });