<?php

namespace Mst\Services;

use Symfony\Component\Filesystem\Filesystem;
use Webmozart\Assert\Assert;

/**
 * @author javi
 */
class FileProcessator
{
    /**
     * Write files
     * @param string $filesDir base directory where save files
     * @param array $filesContents array con los nombres de archivos y sus contenidos
     * @param string $fileExtension extension for files
     * @return string $newDir directory where files are generated  
     */
    public function writeFiles($filesDir, array $filesContents, $fileExtension)
    {
        Assert::stringNotEmpty($filesDir);
        Assert::stringNotEmpty($fileExtension);

        $filesystem = new Filesystem();
        
        $newDir = $filesDir . DIRECTORY_SEPARATOR . uniqid();

        $filesystem->mkdir($newDir, $mode = 0750);

        foreach ($filesContents as $key => $value) {
            Assert::stringNotEmpty($value);

            $fileLocation = $newDir . DIRECTORY_SEPARATOR . $key . '.' . $fileExtension;

            $filesystem->dumpFile($fileLocation, $value);
        }

        return $newDir;
    }
    
}