<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Tugas6</title>
</head>
<body>
    <h2>Pengulangan Angka Genap 1 - 10</h2>
    <p>
        <?php
        $angkaGenap = [];
        for ($i = 1; $i <= 10; $i++) {
            if ($i % 2 === 0) {
                $angkaGenap[] = $i;
            }
        }
        echo implode(', ', $angkaGenap);
        ?>
    </p>
</body>
</html>