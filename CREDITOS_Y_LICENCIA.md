# Créditos y licencias · Atlas ETM V61

## Modelo cerebral base y fascículos

`models/brain.glb` y los metadatos asociados proceden de [Brain Project](https://github.com/itayinbarr/brainproject), de Itay Inbar. La geometría base se acredita a los colaboradores de [Z-Anatomy](https://github.com/Z-Anatomy/Models-of-human-anatomy) y a [BodyParts3D](https://lifesciencedb.jp/bp3d/), © Database Center for Life Science (DBCLS). El modelo base, los metadatos derivados y los datos geométricos derivados del modelo se redistribuyen bajo [CC BY-SA 4.0 Internacional](https://creativecommons.org/licenses/by-sa/4.0/). El aviso de origen se conserva en [LICENSE_ORIGINAL.txt](LICENSE_ORIGINAL.txt).

Atlas ETM adapta las etiquetas y agrupaciones de la visualización, utiliza muestras de las superficies para representar nodos y genera líneas ilustrativas a partir de trazos de los fascículos del modelo. Los cambios de presentación y los trazos ilustrativos se realizaron para este visor educativo.

Brain Project acredita estas fuentes adicionales para los activos anatómicos registrados:

- Atlas subcortical CIT168, Pauli, Nili y Tyszka (2018). [Datos en OSF](https://osf.io/jkzwp/) · [Artículo](https://doi.org/10.1038/sdata.2018.63) · [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/).
- Atlas de la amígdala CIT168, Tyszka y Pauli (2016). [Datos en OSF](https://osf.io/hksa6/) · [Artículo](https://doi.org/10.1002/hbm.23289) · [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/).
- Atlas talámico de Najdenovska y colaboradores (2018). [Datos en Zenodo](https://doi.org/10.5281/zenodo.1405484) · [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/).
- Atlas hipotalámico de Neudorfer y colaboradores (2020). [Datos en Zenodo](https://doi.org/10.5281/zenodo.3942115) · [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/).
- Plantilla poblacional de tractografía HCP1065, Yeh (2022). [Datos y licencia de la plantilla](https://brain.labsolver.org/hcp_trk_atlas.html) · [Artículo](https://doi.org/10.1038/s41467-022-32595-4).

## Superficies corticales adicionales

`models/mindboggle_oas1_0368_cortex_v44_medial.glb` y sus metadatos se derivan de [Mindboggle-101: FreeSurfer output](https://doi.org/10.5281/zenodo.22072032), de Arno Klein, registro `OAS1_0368_MR1_fs5.1`, bajo [CC BY 4.0 Internacional](https://creativecommons.org/licenses/by/4.0/). Referencia del proyecto: [Klein y Tourville (2012)](https://doi.org/10.3389/fnins.2012.00171).

Las superficies se convirtieron a formato GLB y se adaptaron al sistema de coordenadas del visor. Atlas ETM aplica una alineación afín aproximada con el modelo base y usa etiquetas en español.

## Código y bibliotecas

- El visor Atlas ETM es una implementación educativa para mostrar la anatomía y simular la propagación de una crisis. El aviso Apache 2.0 de [LICENSE_ORIGINAL.txt](LICENSE_ORIGINAL.txt) corresponde al código de Brain Project.
- Three.js Authors, [Three.js r137](https://github.com/mrdoob/three.js/tree/r137), incluidos OrbitControls, GLTFLoader y DRACOLoader. Se incluye en `vendor/three/` para ejecutar el atlas localmente. [Licencia MIT incluida](vendor/three/LICENSE.txt).
- Google, [Draco](https://github.com/google/draco). Los archivos de `vendor/draco/` incluyen componentes para decodificar la geometría comprimida. [Licencia Apache 2.0 incluida con Draco](vendor/draco/LICENSE.txt).

Los modelos y la animación se usan con fines educativos. La ubicación de las regiones registradas desde atlas de neuroimagen es aproximada. Las etapas y líneas de la animación son ilustrativas.
