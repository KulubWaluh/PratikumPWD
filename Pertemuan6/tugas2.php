<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <h2>Tabel Perkalian Matriks 10x10</h2>
    <table border="1" cellpadding="5" cellspacing="2">
        <?php
        for ($baris = 0; $baris <= 10; $baris++) {
            echo "<tr>\n";
            for ($kolom = 0; $kolom <= 10; $kolom++) {
                if ($baris === 0 && $kolom === 0) {
                    echo '            <td style="background-color: #FFFFFF; color: #000000;">bilangan</td>' . "\n";
                } elseif ($baris === 0) {
                    echo '            <td style="background-color: #00FF00; color: #000000;">' . $kolom . "</td>\n";
                } elseif ($kolom === 0) {
                    echo '            <td style="background-color: #00FF00; color: #000000;">' . $baris . "</td>\n";
                } else {
                    $hasil = $baris * $kolom;
                    $warna = ($hasil % 2 !== 0) ? '#FFFF00' : '#00FFFF';
                    echo '            <td style="background-color: ' . $warna . '; color: #000000; text-align: left;">' . $hasil . "</td>\n";
                }
            }
            echo "        </tr>\n";
        }
        ?>
    </table>
</body>
</html>