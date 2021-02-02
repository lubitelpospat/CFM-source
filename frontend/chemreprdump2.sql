-- MySQL dump 10.13  Distrib 5.7.30, for Linux (x86_64)
--
-- Host: localhost    Database: chemreprogramming
-- ------------------------------------------------------
-- Server version	5.7.30-0ubuntu0.18.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `MAIN`
--

DROP TABLE IF EXISTS `MAIN`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `MAIN` (
  `protocolId` int(11) NOT NULL AUTO_INCREMENT,
  `DOI` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `species` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `sourceCellType` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `targetCellType` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `duration` int(11) DEFAULT NULL,
  `medium` text COLLATE utf8mb4_unicode_ci,
  `initialCulture` text COLLATE utf8mb4_unicode_ci,
  `title` text COLLATE utf8mb4_unicode_ci,
  `yield` float DEFAULT NULL,
  `commentOnYield` text COLLATE utf8mb4_unicode_ci,
  `type_of_protocol` int(11) DEFAULT NULL,
  `comment_on_protocol` varchar(150) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `rate1_avg` int(11) NOT NULL,
  `rate2_avg` int(11) NOT NULL,
  `rate3_avg` int(11) NOT NULL,
  PRIMARY KEY (`protocolId`)
) ENGINE=InnoDB AUTO_INCREMENT=47 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `MAIN`
--

LOCK TABLES `MAIN` WRITE;
/*!40000 ALTER TABLE `MAIN` DISABLE KEYS */;
INSERT INTO `MAIN` VALUES (4,'10.1371/journal.pone.0089678','Mus musculus','fibroblasts','induced cardiomyocytes',14,'doxycycline (2 µg mL−1) and the PGK-H2B-mCherry lentivirus','MEFs, isolated at E14.5','Inhibition of TGFβ signaling increases direct conversion of fibroblasts to induced cardiomyocytes',16.95,'',NULL,'Not fully chemical reproramming, they just supplemented ectopic expression of Hand2, Nkx2.5, Gata4, Mef2C, and Tbx5 by SB431542',0,0,0),(5,'10.1007/s12015-013-9477-9','Pig','fibroblasts','insulin secreting cells (β cells)',36,'N2B27 with 0.1 mM β- mercaptoetanol (Sigma), 2 mM glutamine (Sigma), 1 mM MEM Non-Essential Amino Acids (Gibco) and 0.5 % (w/v) bovine serum albumin (Sigma)','Primary porcine skin fibroblast cultures were established from fresh biopsies','Reprogramming of pig dermal fibroblast into insulin secreting cells by a brief exposure to 5-aza-cytidine',38.1,'counting insulin labeled cells with a flow cytometer',NULL,NULL,0,0,0),(6,'10.1038/ncomms3183','Homo sapiens','Fetal Lung Fibroblasts;Skin Fibroblasts','Cholinergic Neurons',28,'','Human fibroblasts were obtained from commercial sources and maintained in fibroblast medium (DMEM supplemented with 10 or 15%  fetal bovine serum and penicillin/streptomycin) according to the  vendor’s instructions for cell culture.','Small Molecules Enable Neurogenin 2 to Efficiently Convert Human Fibroblasts Into Cholinergic Neurons',57.2,'',NULL,NULL,0,0,0),(7,'10.1016/j.biocel.2013.04.022','Homo sapiens','bone marrow derived mesenchymal stem cells','mature neuronal-like cells',28,'NeuroCult supplemented with 1% penicillin/streptomycin, 2 mM Glutamine, 1% N2, 20 ng/ml recombinant human EGF10 ng/ml recombinant human bFGF, 4 g/ml heparin, 10 ng/ml recombinant human LIF','8-week fetal forebrain','Enhancing the efficiency of direct reprogramming of human mesenchymal stem cells into mature neuronal-like cells with the combination of small molecule modulators of chromatin modifying enzymes, SMAD signaling and cyclic adenosine monophosphate levels',1,'Sodium current, Electrophysiological recordings',NULL,NULL,0,0,0),(8,'10.1371/journal.pone.0003531','Mus musculus','primordial Germ Cells','pluripotent epiblast cells ',10,'LIF (1200 IU/ml), FGF-2 (25 ng/ml) ','EG cell lines, 8.5 EGC-1 and 4-3 Rosa, were derived from E8.5 and −11.5 PGCs','Reprogramming Primordial Germ Cells into Pluripotent Stem Cells',30,'cells were stained for TNAP activity and the number of colonies was counted',NULL,NULL,0,0,0),(9,'10.2217/rme.10.67','Homo sapiens','bone marrow (BM)-derived mesenchymal stem cells (MSCs) ','neural-like cells',28,'epigenetic modifiers (e.g., inhibitors of DNA methylation and histone deacetylation) and to a neural environment (i.e., NSC condition medium and fixed NSCs), or neural induction factors, neurotrophins (NTs), mitogens, sonic hedgehog, retinoic acid, ascorbic acid and pharmacological agents that increase intracellular cAMP levels','Human BM‑derived MSCs','An efficient method for generation of neural-like cells from adult human bone marrow-derived mesenchymal stem cells',30,'long axon- and dendrite-like extensions',NULL,'TSA complimented by LIF and SCF',0,0,0),(10,'10.1002/hep.23506','Homo sapiens','embryonic stem cells','hepatocytes',20,'CDM + 10 ng/mL activin + FGF2 12 ng/mL, CDM/PVA, 100 ng/mL activin, 20 ng/mL FGF2, 10 ng/mL BMP4, 10 μM, FGF10, 10−7 M retinoic acid, 10 μM SB431542','hESCs (H9; WiCell, Madison, WI)','Generation of functional hepatocytes from human embryonic stem cells under chemically defined conditions that recapitulate liver development',60,'cuboidal shapes typical of hepatocytes. In addition, the cells generated expressed markers specific for mature liver cells, including α1‐antitrypsin (AAT), APOA‐II, tyrosine aminotransferase, tryptophan 2,3‐dioxygenase, factor IX, and the detoxifying enzymes Cyp3A7 and Cyp7A1',NULL,NULL,0,0,0),(11,'10.1089/scd.2013.0438','Mus musculus','primordial germ cells','embryonic germ cells',10,'This medium contained knockout Dulbecco’s modified Eagle’s medium (KODMEM;Invitrogen), 2% fetal calf serum (FCS; HyClone)or knockout serum replacement (KSR; Gibco), 0.1% MEMnonessential amino acids (Invitrogen), 2mM L-glutamine(Invitrogen), 0.1mM b-mercaptoethanol (Sigma-Aldrich),100 U/mL penicillin and 100 mg/mL streptomycin (Invitrogen)supplemented with recombinant mouse LIF(1000 U/mL; ESGRO, Chemicon), homemade bFGF(25 ng/mL; Royan Institute), and SCF (100 ng/mL; R&D).The following day we replaced the medium with serumfreeN2B27-supplemented medium that consisted ofDMEM/F12 (Invitrogen) and neurobasal (Invitrogen) at a1:1 ratio, 1% N2 supplement (Invitrogen), 1% B27 supplement(Invitrogen), 2mM L-glutamine, 1% MEM nonessentialamino acids, 100 U/mL penicillin, 100 mg/mLstreptomycin, 0.1mM b-mercaptoethanol and 5 mg/mLBSA (Sigma-Aldrich), LIF (1000 U/mL)','used outbred (NMRI) and inbred (DBA2; Pasteur Institute, Tehran, Iran) mice strains to derive EGCs.All  embryos were obtained by natural mating.','Efficient induction of pluripotency in primordial germ cells by dual inhibition of TGF-β and ERK signaling pathways',47,'differentiation capacity',NULL,NULL,0,0,0),(12,'10.1089/scd.2013.0134','Homo sapiens','fibroblasts','islet-like cells, β cells',5,'Islet cells were grown in Dulbeco modified Eagle medium (DMEM) supplemented with 2%fetal calf serum, 100U/mL of penicillin, 100 mg/mL of streptomycin, and 2mM glutamine','Adult human primary dermal fibroblasts were obtained from ATCC. Human islets were obtained from cadaveric from ATCC. Human islets were obtained from cadaveric pancreases from the National Islet cell Resource Center Basic Science Islet Distribution Program','Reprogramming Adult Human Dermal Fibroblasts to Islet-Like Cells by Epigenetic Modification Coupled to Transcription Factor Modulation',84,'Over 80% of the cells stained positive for glucagon, while only around 2%–4% of the cells were positive for insulin',NULL,'TF Pdx1 can increase yield, but romidepsin and 5-Azacytidine are able to induce islet-like cell from fibroblasts',0,0,0),(13,'10.1089/cell.2011.0074','Sus scrofane','embryonic fibroblasts','adipocytes',20,'DMEM supplemented with 10% FBS, 0.1mM nonessential amino acids, 0.055mM 2-mercaptoethanol, and 2mM L-glutamine; chemical induction medium contained DMEM/F12, 15% Knockout Serum Replacement, 0.1mM nonessential amino acids, 0.055mM  2-mercaptoethanol, 2mM L-glutamine, 2 lM Thiazovivin, and 0.5 lM SB431542. The hormonal induction medium contained DMEM, 15% FBS, 0.1mM nonessential amino acids, 0.055mM 2-mercaptoethanol, 2mM L-glutamine, 5 lg/mL insulin, 1 lM dexamethasone, and 0.5mM isobutylmethylxanthine','The PEFs were isolated from the 35-day-old fetuses of a 10-week-old Chinese miniature pig','Direct Conversion of Porcine Embryonic Fibroblasts into Adipocytes by Chemical Molecules',27,'Lipid accumulation was assessed by the quantification of A510 in destained Oil Red O with isopropanol',NULL,NULL,0,0,0),(14,'10.1007/s12015-013-9482-z','Homo sapiens','human pluripotent stem cell','neural precursors',12,'KO-DMEM/SR medium (KO-DMEM, 20 % KO-SR, 1 % MEM-non essential amino acids, 1mML-Glutamine, 0.1mM β–Mercaptoethanol and 1 % Penicillin/Streptomycin) supplemented with ROCK inhibitor; mTeSR1 medium; DMEM/F12/N2 medium (DMEM-F12, supplemented with 1 % N2, 1.6 g/L Glucose, 1 % Penicillin/Streptomycin, and 20 μg/mL Insulin)','Model hPSC-Lines and Culture Conditions The hiPSC-line (iLB-C1-30 m-r12) and the iLB-C1-30 m-r12-derivedlong-term self-renewing neuroepithelial-like stem cell line(lt-NES®: iLB-C1-30 m-r12) were derived at Prof. OliverBrüstle laboratory (University of Bonn), and the hESC-line(BG01V/hOG - hOct4-GFP) was obtained from Invitrogen','Integrated Platform for Production and Purification of Human Pluripotent Stem Cell-Derived Neural Precursors',80.4,'kinetic and phenotype analysis',NULL,NULL,0,0,0),(15,'10.1007/s12015-013-9493-9','Homo sapiens','neural stem cell-like cells','dopaminergic neurons ',20,'NP2 medium consisted of D-MEM/F-12/GlutaMAX, 1x Pen/Strep, FBS (1 %); ITS+3 or SITE+3, β-mercaptoethanol (10 μM), Heparin (2 μg/ml); EGF (20 ng/ml); rhFGF2 (10 ng/ml) and NT-3 (10 ng/ml); DMEM-F12-Glutamax medium that was supplemented with 1 % fetal bovine serum (FBS; where indicated), penicillin/streptomycin, SHH-C24II (500 ng/ml; 100 ng/ml), FGF8b (10 ng/ml), rhGDNF (5 ng/ml), rhBDNF (20 ng/ml), db c-AMP (1 mM) ascorbic acid (200 μM), and CHIR99021 (0.5 μM; where indicated), B27 (minus vitamin A) supplement, brain derived neurotrophic factor (rhBDNF, 20 ng/ml), glial cell line derived factor (GDNF, 5 ng/ml), ascorbic acid and dibutyryl cyclic AMP (db c-AMP; 100–500 μM). The WNT inhibitor, IWP-4 [ref 37] (100 nM days 4–6; 1 μM thereafter), SB431542 (10 μM) and LDN-193189 (100 nM) were added as indicated. ','De-identified pubic hairy skin biopsies were obtained with ethical approval (REC REF: 08/H0907/1) from consenting individuals undergoing repeat elective Caesarean sections. ','Differentiation of Human Epidermal Neural Crest Stem Cells (hEPI-NCSC) into Virtually Homogenous Populations of Dopaminergic Neurons',83.2,'spontaneous Ca2+ activity in the form of brief spatially restricted elevations',NULL,NULL,0,0,0),(16,'10.1186/scrt423','Homo sapiens','human cord blood-derived iPSCs','neuronal progenitor cell',40,'knockout medium containing knockout DMEM, 20% knockout serum replacement, 0.1 mM MEM nonessential amino acids, 2 mM glutamax and 0.1 mM β-mercaptoethanol supplemented with 10 μM SB 431542 (SB, Biomol, Hamburg, Germany) and 1 μM DM (R&D Systems, Wiesbaden-Nordenstadt, Germany). On day four, the medium was changed to DMEM/F12 consisting of glutamax, N2 supplement, 10 μM SB, 1 μM DM, 0.6 μM purmorphamine (PMA, Biomol) and 100 ng/ml fibroblast growth factor 8 (FGF8). After six days, SB and DM were withdrawn. After six additional days in suspension, EBs were attached to poly-L-ornithine (20 μg/ml)/laminin (10 μg/ml)-coated cell culture plates and cultured in Neurobasal medium supplemented with glutamax, N2, B27 minus AO, 20 ng/ml BDNF, 20 ng/ml GDNF, 25 ng/ml TGFβ3, 200 μM ascorbic acid (Sigma-Aldrich) and 1 mM cAMP (Sigma-Aldrich) for up to 30 days.','hCBiPSC','Functional differentiation of midbrain neurons from human cord blood-derived induced pluripotent stem cells',44,'sodium inward currents',NULL,NULL,0,0,0),(17,'10.1210/en.2012-1060','Homo sapiens','Human Embryonic Stem Cells','Steroid-Producing Cells',21,'maintenance medium [77% DMEM/F12 medium, 20% knockout serum replacement, 1% nonessential amino acids, 1% penicillin/streptomycin, 2 mML-glutamine, and 0.1 mM β-mercaptoethanol]','Two human ES cell lines (H9 and KhES1) and one human iPS cell line (201B7)','Differentiation of Human Embryonic Stem Cells and Human Induced Pluripotent Stem Cells into Steroid-Producing Cells',0,'mRNA encoding adrenal cortical or gonad-specific steroidogenic enzymes, such as CYP17A1, CYP21A2, and CYP11B1 and produced steroid hormones such as progesterone, corticosterone, and cortisol.',NULL,NULL,0,0,0),(18,'10.1002/stem.1152','Homo sapiens','Human Embryonic Stem Cells/hiPSCs','Dopamine Neurons',12,'Dulbecco\'s modified Eagle\'s medium/F12, N2 supplement, nonessential amino acids, and heparin in the presence of SB431542 (10 μM) and LDN193189 (200 nM, both from Stemgent). To pattern the differentiating cells to the midbrain FP progenitors, SHH (C25II, 500  ng/ml, R&D Systems, and CHIR99021 were added to the cultures from day 1 for 8 days.','Primate ESCs and iPSCs Human ESCs (WA09, passages 23‐45) and iPSCs (IMR90‐4, passages 45‐55)','Specification of Midbrain Dopamine Neurons from Primate Pluripotent Stem Cells',96.7,'TH‐positive neurons coexpressed FoxA2',NULL,NULL,0,0,0),(19,'10.1021/cn300029t','Homo sapiens','hiPSCs','Dopamine Neurons',21,'DMEM medium containing 10% FBS, penicillin/streptomycin, nonessential amino acids; hES medium (DMEM/F12, 20% Knockout serum replacement, 2 mM Glutamax, nonessential amino acids, penicillin/streptomycin, 55 μM β-mercaptoethanol, recombinant human FGF-2); mTeSR1 medium; neuralization medium (Knockout DMEM/F12, 15% KSR, glutamax, penicillin/streptomycin, nonessential amino acids, and 55 μM β-mercaptoethanol containing 10 μM of SB431542 Noggin or DMH1; N2-medium (DMEM/F12, N2 supplement, and high D-glucose 4.5 g/L) ','Skin biopsies (3 mm) were obtained from four different subjects for the purpose of generating hiPSCs ','DMH1, a Highly Selective Small Molecule BMP Inhibitor Promotes Neurogenesis of hiPSCs: Comparison of PAX6 and SOX1 Expression during Neural Induction',100,'PAX6 positive cells',NULL,NULL,0,0,0),(20,'10.1038/cr.2011.195','Homo sapiens| Mus musculus','hiPSCs/miPSCs.','cardiac progenitor cells',30,'ESC medium containing 15% FBS, 1 μmol/l non-essential amino acids, 1 mmol/l Glutamine, 100 μmol/l β-mercaptoethanol, 50 U/ml penicillin, and 50 mg/ml streptomycin on mitomycin-C-treated mouse embryonic fibroblast (MEF) feeder layers in the presence of leukemia inhibitory factor (1 000 U/ml); medium containing 2.5% Knockout Serum Replacement; medium without bFGF; differentiation medium containing 20% FBS','MEFs, NPCs, Meningeal cells, AFDCs','Ascorbic acid enhances the cardiac differentiation of induced pluripotent stem cells through promoting the proliferation of cardiac progenitor cells',86,'expressed SSEA1',NULL,NULL,0,0,0),(21,'10.1016/j.yjmcc.2011.04.012','Homo sapiens','hiPSCs','cardiac like cells',24,'undifferentiated ES culture medium, differentiation medium','human ES and iPS cells','Small molecule Wnt inhibitors enhance the efficiency of BMP-4-directed cardiac differentiation of human pluripotent stem cells',39,'beating EB',NULL,NULL,0,0,0),(22,'10.1007/s00125-011-2246-x','Macaca mulatta','induced pluripotent stem cells','insulin-producing cells',21,'RPMI1640, DF12 and DMEM, were all supplemented with 2 mmol/l Glutamax, 0.1 mmol/l non-essential amino acids, 55 μmol/l beta-mercaptoethanol and penicillin/streptomycin. DF12 and DMEM were also supplemented with 1% B27','RM iPSC R14 and R19 cell lines','Generation of pancreatic insulin-producing cells from rhesus monkey induced pluripotent stem cells',85,'insulin-producing cells',NULL,NULL,0,0,0),(23,'10.1038/nbt.1788','Homo sapiens','hiPSCs','anterior foregut endoderm',19,'DMEM/F12, 20% knockout serum replacement, 0.1 mM β-mercaptoethanol, and 20 ng/ml FGF-2; DMEM/F12 supplemented with N2, B27, ascorbic acid (50 μg/ml), Glutamax (2 mM), monothioglycerol (0.4 μM)','hESC (HES2, National Institutes of Health code ES02 from ES Cell International; passages 25–33); HDF2 and HDF9, hiPS cell lines','Generation of anterior foregut endoderm from human embryonic and induced pluripotent stem cells',95,'definitive endoderm markers CXCR4, c-KIT and EPCAM',NULL,NULL,0,0,0),(24,'10.1093/cvr/cvu023','Mus musculus','fibroblast','cardiomyocyte-like cell',14,'culture medium of fibroblasts','fibroblasts from the heads of day 13.5 mouse embryos','Inhibitors of suppressive histone modification promote direct reprogramming of fibroblasts to cardiomyocyte-like cells',23,'beat spontaneously (The prevalence of cells that showed beating or oscillation of fluorescence was calculated by dividing the  number of these cells by the number of nuclei detected by the Hoechst dye)',NULL,'Not fully chemical, they added a lot of TFs',0,0,0),(25,'10.1126/science.aaf1502','Homo sapiens','fibroblasts','cardiomyocyte-like cell',20,'optimized cardiac induction medium (CIM); human CM–conditioned medium','established human foreskin fibroblast (HFF) line that contains no cardiac cells','Conversion of human fibroblasts into functional cardiomyocytes by small molecules',97,'spontaneously beat and uniformly expressed multiple cardiac structural proteins',NULL,NULL,0,0,0),(26,'10.1007/s12015-013-9477-9','Sus scrofane','Fibroblast','Insulin Secreting Cells',102,'DMEM with 20 % FBS, 2 mM glutamine and antibiotics; 0.1 % gelatin, 1 μM 5-aza-CR; ESC culture medium; N2B27 medium with 0.1 mM β- mercaptoetanol, 2 mM glutamine, 1 mM MEM Non-Essential Amino Acids, 0.5 % (w/v) bovine serum albumin, 30 ng/ml activinA, 10 μM retinoic acid; 1 % B27, 20 ng/ml basic fibroblast growth factor, 1 % insulintransferrin-selenium','Primary porcine skin fibroblast cultures were established from fresh biopsies','Reprogramming of pig dermal fibroblast into insulin secreting cells by a brief exposure to 5-aza-cytidine',38.1,'counting insulin labeled cells with a flow cytometer',NULL,NULL,0,0,0),(27,'10.1007/978-1-4939-0512-6_18','Mus musculus','cardiac fibroblasts','cardiomyocytes',21,'Fibroblast culture medium—Dulbecco’s Modifi ed Eagle’s Medium supplemented with 15 % fetal bovine serum (not heat deactivated) and 1 % penicillin–streptomycin (100 U/mL penicillin and 100 μg/mL streptomycin fi nal concentration) ','From 1- to 2-day-old neonatal mouse pups, remove ventricles under sterile conditions and then wash briefl y in PBS. ','Direct reprogramming of cardiac fibroblasts to cardiomyocytes using microRNAs',5.28,'the expression of calcium signaling properties',NULL,NULL,0,0,0),(28,'10.1016/j.scr.2013.09.007','Mus musculus','fibroblasts','Midbrain Dopaminergic Neuronal Progenitors',13,'Dulbecco\'s modified Eagle\'s medium (DMEM) containing 10% FBS, 1% nonessential amino acids (NEAA), and 1% penicillin/streptomycin; reprogramming initiation medium containing 10% knock-out serum replacer, 5% FBS, 1% NEAA, 2 mM Glutamax, and 0.055 mM  β-mercaptoethanol in knock-out DMEM RepM-DP containing 1x N2, 1x B27,0.05% BSA, 2 mM Glutamax, 0.11 mM β-mercaptoethanol, 200 ng/mL SHH, and 100 ng/mL FGF8b in advanced DMEM/F12 and neurobasal medium (1:1 mix); differentiation medium containing 1x N2, 1x B27, 1.0 mM Glutamax, 0.11 mM β-mercaptoethanol, 1.0 mM dibutyryl-cAMP , 0.2 mM ascorbic acid, 10 ng/mL brain-derived neurotrophic factor (BDNF), 10 ng/mL glial cell line-derived neurotrophic factor (GDNF) in DMEM/F12','mouse adult tail-tip fibroblasts (TTFs)','Direct Lineage Reprogramming of Mouse Fibroblasts to Functional Midbrain Dopaminergic Neuronal Progenitors',42,'Under a currentclamp configuration, depolarizing current injections with 10-pA steps induced action potentials (APs) of recorded cells',NULL,NULL,0,0,0),(29,'10.1073/pnas.1200250109','Homo sapiens','iPSCs/hESC','cardiomyocyte-like cell',30,'hESC medium: DMEM/F12 culture medium 20%, KnockOut serum replacer, 0.1 mM nonessential amino acids, 1 mM l-glutamine, 0.1 mM β-mercaptoethanol, and 10 ng/mL human bFGF; mTeSR1 medium; RPMI/B27-insulin medium 5 ng/mL BMP4, 5 μM IWP2','Transgene-free human iPSCs (6-9-9 and 19-9-11), lentiviral integrated human iPSC (IMR90C4), and hESCs (H9, H13, H14)','Robust cardiomyocyte differentiation from human pluripotent stem cells via temporal modulation of canonical Wnt signaling',98,'contracted spontaneously as coordinated sheets',NULL,NULL,0,0,0),(30,'10.1038/nmeth.2999','Homo sapiens','hiPSCs','cardiomyocyte-like cell',20,'DMEM GlutaMAX 10% FBS, 1:200 dilution of growth factor–reduced Matrigel 9 μg/cm2; E8 medium (50:50 mixture of DMEM and Ham\'s F12 medium), 20 μg/ml Escherichia coli–derived recombinant human insulin, 64 μg/ml L-ascorbic acid 2-phosphate sesquimagnesium salt hydrate, 10.7 μg/ml O. sativa–derived recombinant human transferrin, 14 ng/ml sodium selenite, 100 ng/ml recombinant human FGF2, 2 ng/ml recombinant human TGFβ1, 100 nM hydrocortizone, 200 μM sodium butyrate; E7N (E8 minus TGFβ1; 200 μM sodium butyrate); blood medium: IMDM:F12, 2 mg/ml recombinant human albumin, 1% v/v chemically defined lipid concentrate, 10 μg/ml recombinant human insulin, 100 μg/ml recombinant human transferrin, 15 ng/ml sodium selenite, 64 μg/ml L-ascorbic acid 2-phosphate, 450 μM 1-thioglycerol, 50 ng/ml SCF, 10 ng/ml IL3, 2 U/ml EPO, 40 ng/ml IGF1 (Peprotech) and 1 μM dexamethasone; CDM3 medium: RPMI 1640 medium, 500 μg/ml O. sativa–derived recombinant human albumin, 75 mg/ml stock solution in water for injection (WFI) quality H2O, stored at −20 °C, 213 μg/ml L-ascorbic acid 2-phosphate, 2 μM Wnt-C59','two 2-mm skin punch biopsies were taken from each volunteer, diced with a scalpel','Chemically Defined and Small Molecule-Based Generation of Human Cardiomyocytes',95,'flow cytometry for TNNT2',NULL,NULL,0,0,0),(31,'10.1016/j.stem.2010.11.015','Homo sapiens','keratinocytes','iPSC',28,'','human epidermal keratinocytes (NHEKs)','Reprogramming of Human Primary Somatic Cells by OCT4 and Chemical Compounds',0,'',NULL,'Not fully chemical',0,0,0),(32,'10.1111/j.1432-0436.2008.00284.x','Homo sapiens','Human Embryonic Stem Cells','cardiomyocyte-like cell',20,'KO-DMEM, 20% Knockoutt serum replacement (KO-SR), 1 NAA, 2mM L-glutamine, bFGF (10 ng/ml) on human fibroblasts (CCD-919Sk). Fibroblasts were cultured in DMEM, 20% FBS, 2mM L-glutamine, and 1 ITS (insulin-tranferrinselenium) to confluence, treated with mitomycin C (10 mg/ml)','hESC lines HES2 and HES3-GFP from ES Cell International at passages 75–125 and NL-HES1 and 2 at passages 25–45','Chemically defined medium supporting cardiomyocyte differentiation of human embryonic stem cells.',9,'Cytospin analysis and immunocytochemistry was conducted using cardiac a-MHC-specific staining',NULL,NULL,0,0,0),(33,'10.1038/cr.2014.32','Mus musculus; Homo sapiens ','MEFs, mouse tail-tip fibroblasts, human urinary cells','NPCs',20,'DMEM 10% FBS, 1 mM GlutaMAX, 0.1 mM non-essential amino acid; neural expansion medium 30 ng/ml heparin, 20 ng/ml EGF and 20 ng/ml bFGF; KSR medium including knockout DMEM, 15% knockout serum replacement, 1% NEAA, 1% GlutaMax, 1% sodium pyruvate, 0.1 mM β-mercaptoethanol, 1 000 U/ml leukemia inhibitory factor; mTeSR medium; N2B27 medium DMEM:F12, 1% N2, 2% B27, BMP4 50 ng/ml,1% FBS; neural differentiation medium neural basal medium, 2% B27, 1% N2, 10 ng/ml BDNF, 10 ng/ml GDNF, 10 ng/ml IGF-1, 1 μM cAMP, 200 μM ascorbic acid','MEFs were isolated from E13.5 mouse embryos; TTFs were isolated from C57BL/6 neonate on day 3','Generation of neural progenitor cells by chemical cocktails and hypoxia.',25,'morphological characteristics of oligodendrocytes ',NULL,NULL,0,0,0),(34,'10.1155/2016/4304916','Mus musculus','MEFs, mouse tail-tip fibroblasts','Neural stem cells',42,'DMEM 10% FBS, 50 units/mL penicillin, 50 μg/mL streptomycin; Stem cell culture medium 15% FBS, 1% nonessential amino acids, 1% L-glutamine, 50 units/mL penicillin, 50 μg/mL streptomycin, 0.1 mM β-mercaptoethanol, 1,000 units mL−1 leukaemia inhibitory factor (LIF) small molecules (valproic acid, 1 μM; Bix01294, 1 μM; RG108, 0.04 μM; PD0325901, 1 μM; CHIR99021, 3 μM; vitamin C, 25 μM; A83-01, 2.5 μM; neural stem cell medium DMEM/F12 with B-27, 50 units/mL penicillin, 50 μg/mL streptomycin, 8 mM HEPES buffer, 20 ng/mL EGF, and 10 ng/mL bFGF','Mouse embryonic fibroblasts (MEF) and tail-tip fibroblasts (TTF) were isolated from C57/BL6 mice','Direct reprogramming of mouse fibroblasts to neural stem cells by small molecules.',2,'the minimum cell number to form one colony',NULL,NULL,0,0,0),(35,'10.1016/j.bbrc.2016.05.080','Mus musculus','MEFs','Neural stem cells',NULL,'','mouse embryonic fibroblasts (MEFs)','A combination of small molecules directly reprograms mouse fibroblasts into neural stem cells. ',60,'',NULL,NULL,0,0,0),(36,'10.1016/j.stem.2016.03.020','Mus musculus','MEFs','Neural stem cells',25,'MEF medium(DMEM supplemented with 10% fetal bovine serum, 0.1 mM nonessential amino acids, and 2 mM Glutamax); M9 medium (50% Neural basal, 50% DMEM/F12/Glutamax, 1 3 N2, 1 3 B27 without vitamin A, 0.075% BSA, 0.1 mM nonessential amino acids, with 3 mM CHIR99021, 100 nM LDN193189, 0.5 mM A83-01, 0.5 mM Hh-Ag1.5, 1 mM retinoic acid, 10 mM SMER28, 10 mM RG108, 2 mM Parnate, and 10 ng/ml bFGF); neural stem cells medium (NSC medium: 50% Neural basal, 50% DMEM/F12/Glutamax, 1 3 N2, 1 3 B27 without vitamin A, 0.075% BSA, 0.1 mM nonessential amino acids, 20 ng/ml bFGF, and 20 ng/ml EGF)','cells from MEFs derived from embryonic day 13.5 (E13.5) mouse embryos of Fsp1-Cre/ROSA26td','Pharmacological reprogramming of fibroblasts into neural stem cells by signaling-directed transcriptional activation.',31,'Sox2+/Nestin+ ciNSLCs',NULL,NULL,0,0,0),(37,'10.1038/s41598-017-10394-y','Homo sapiens','Human adipose-derived mesenchymal stem cells','Neural stem cells',25,'NSC induction medium Dulbecco’s modified Eagle’s medium F12 (DMEM/F12) supplement with 3% KOSR, 1% Glutamax, 1% non-essential amino acid  and 4 ng/mL basic fibroblast growth factor (bFGF) with or without three small molecules; 10 μM SB431542, 100 ng/ml noggin and 0.5 μM LDN193289','Adipose tissue was obtained through liposuction from the healthy volunteers (23–26 years old)','Small molecule-based lineage switch of human adipose-derived stem cells into neural stem cells and functional GABAergic neurons',85,'Flow cytometry analyses the proportion of NCAM-positive',NULL,NULL,0,0,0),(38,'10.1016/j.celrep.2016.12.062','Mus musculus','myoblasts','brown adipocytes',8,'basal adipogenesis conditions (850 nM insulin, 1 nM T3, 0.5 mM isobuylmethylxanthine, 125 μM indomethacin, and 5 μM dexamethasone in 10% FBS DMEM); 10% FBS DMEM containing 850 nM insulin and 1 nM T3','C2C12, 3T3-L1, and C3H10T1/2 cells were purchased from the ATCC','Brown adipogenic reprogramming induced by a small molecule',70,'the efficiency of Prdm16 knockdown in pre-brown adipocyte',NULL,NULL,0,0,0),(39,'10.1038/s41598-017-04665-x','Homo sapiens','fibroblasts','brown adipocytes',28,'adipocyte medium including rosiglitazone; adipocyte medium in combination with GSK3β inhibitor, CHIR99021 (G), a MEK inhibitor, PD0325901 (M), a TGF-β signalling inhibitor, SB-431542 (S), a BMP signalling inhibitor, LDN-193189 (L), a P53 inhibitor, Pifithrin-α (P), and a cAMP inducer, Forskolin (F)','The 3 lines of the human fibroblasts, HDF0, HDF38','Takeda, Y., Harada, Y., Yoshikawa, T. and Dai, P. (2017) Direct conversion of human fibroblasts to brown adipocytes by small chemical compounds. Sci. Rep. 7, 4304, https://doi.org/10.1038/s41598-017-04665-x',100,'Oil Red O staining',NULL,NULL,0,0,0),(40,'10.1038/cr.2015.99','Mus musculus','MEFs','Cardiomyocyte',25,'CRM is composed of knockout DMEM, 15% FBS, 5% KSR, 0.5% N2, 2% B27, 1% Glutamax, 1% NEAA, 0.1 mM β-mercaptoethanol, 50 μg/ml 2-phospho-L-ascorbic acid (vitamin C), 100 units/ml penicillin and 100 μg/ml streptomycin. CRFVPT cocktail consists of 10 μM CHIR99021 (C); 10 μM RepSox (R); 50 μM Forskolin (F); 0.5 mM VPA (V); 5 μM Parnate, (P); 1 μM TTNPB (T)','MEFs were isolated from embryonic day 13.5 (E13.5) C57BL/6 mouse embryos','Fu, Y., Huang, C., Xu, X., Gu, H., Ye, Y., Jiang, C. et al. (2015) Direct reprogramming of mouse fibroblasts into cardiomyocytes with chemical cocktails. Cell Res. 25, 1013–1024, https://doi.org/10.1038/cr.2015.99',14.5,'α-actinin positive',NULL,NULL,0,0,0),(41,'10.1038/srep13320','Mus musculus','Rat bone-marrow derived MSCs','hepatocytes',21,'2 μM of different bile acids or by 50 ng/ml human FGF4, 40 ng/ml human HGF dissolved in Iscove’s Modified Dulbecco’s Medium supplemented with 1% insulin-transferrin-sodium selenite, 1% linolic acid-albumin from bovine serum, 1% antibiotic/antimycotic solution','HSC were isolated from adult Wistar rats (>500 g) and Black 6 mice (>25 g)','Sawitza, I., Kordes, C., Götze, S., Herebian, D. and Häussinger, D. (2015) Bile acids induce hepatic differentiation of mesenchymal stem cells. Sci. Rep. 5, 13320, https://doi.org/10.1038/srep13320',23,'albumin mRNA expression',NULL,NULL,0,0,0),(42,'10.1016/j.celrep.2016.03.071','Mus musculus','MEFs','hepatocytes',21,'DMEM/F-12 10% fetal bovine serum (FBS), 0.1 mM dexamethasone, 10 mM nicotinamide, 1% ITS (insulin-transferrin-selenium) premix, penicillin/streptomycin/glutamine, 10 ng/ml fibroblast growth factor 4, hepatocyte growth factor, epidermal growth factor','mouse embryonic fibroblasts','Lim, K.T., Lee, S.C., Gao, Y., Kim, K.P., Song, G., An, S.Y. et al. (2016) Small molecules facilitate single factor-mediated hepatic reprogramming. Cell Rep. 15, 814–829, https://doi.org/10.1016/j.celrep.2016.03.071',14.5,'',NULL,NULL,0,0,0),(43,'10.1016/j.stemcr.2017.06.013','Mus musculus','MEFs','hepatocytes',18,'HRM (DMEM/F12, 10% FBS, 10% KSR [Gibco]). Insulin (1 μg/mL), 0.5× N2, 0.5× B27 (Gibco), 2 mM GlutaMAX, 0.1 mM NEAA, 100 units/mL penicillin, and 100 μg/mL streptomycin, containing the small-molecule cocktails CRFVPTD or CRVPTD (10 μM CHIR99021 [C], 10 μM RepSox [R], 0.5 mM VPA [V], 5 μM Parnate [P], 1 μM TTNPB [T], 50 μM Forskolin [F], and 50 nM Dznep [D]','MEFs were isolated from E12.5','Guo, R., Tang, W., Yuan, Q., Hui, L., Wang, X. and Xie, X. (2017) Chemical cocktails enable hepatic reprogramming of mouse fibroblasts with a single transcription factor. Stem Cell Rep. 9, 499–512, https://doi.org/10.1016/j.stemcr.2017.06.013 Lim, K.T., Lee, S.C., Gao, Y., Kim, K.P., Song, G., An, S.Y. et al. (2016) Small molecules facilitate single factor-mediated hepatic reprogramming. Cell Rep. 15, 814–829, https://doi.org/10.1016/j.celrep.2016.03.071',42.9,'positive for albumin',NULL,NULL,0,0,0),(44,'10.1016/j.stem.2016.06.006','Homo sapiens','gastric epithelial cells','Endoderm progenitor cells',55,'Advanced DMEM/F12 supplemented with combinations of small molecules as indicated: Bay K 8644, 2 μM; Bix01294, 0.5 μM; SB431542, 2 μM; RG108, 0.04 μM ','The hGECs were isolated from macroscopically normal mucosa of surgical specimens from patients (ranging from 35 to 78 years old) who had undergone gastrectomies due to stomach cancer, or they were from endoscopic biopsies from patients who underwent physical reexamination after recovery from a gastric ulcer or gastritis with Helicobacter pylori (H. pylori) undetectable in the recovered tissue','Wang, Y., Qin, J., Wang, S., Zhang, W., Duan, J., Zhang, J. et al. (2016) Conversion of human gastric epithelial cells to multipotent endodermal progenitors using defined small molecules. Cell Stem Cell 19, 449–461, https://doi.org/10.1016/j.stem.2016.06.006',90,'the differentiating cells started to express ALB by day 14 of hepatic induction ',NULL,NULL,0,0,0),(45,'10.1074/jbc.M117.812537','Mus musculus','MEFs','Endoderm progenitor cells',24,'N2B27 medium supplemented with bFGF(10ng/ml), BMP4(10ng/ml), RepSox(5μM), CHIR(3μM), FSK(10μM), TTNPB (1μM), Y27632(10μM); modified medium, for which, the concentration of CHIR was adjust to 10μM, TTNPB was deleted from and ActivinA(100ng/ml) was added to the cocktails.','MEFs were derived from 13.5 d.p.c mouse embryos from cross of male Oct4–GFP transgenic allele carrying mice (CBA/CaJ X C57BL/6J) to 129Sv/Jae female mice','Cao, S., Yu, S., Chen, Y., Wang, X., Zhou, C., Liu, Y. et al. (2017) Chemical reprogramming of mouse embryonic and adult fibroblast into endoderm lineage. J. Biol. Chem. 292, 19122–19132, https://doi.org/10.1074/jbc.M117.812537',66.7,'ALB positive',NULL,NULL,0,0,0),(46,'10.1016/j.stem.2016.10.007','Mus musculus','Rodent primary hepatocytes','Chemically induced liver progenitors (CliPs)',14,'MHs was SHM, namely, DMEM/F12 containing 2.4 g/L NaHCO3 and L-glutamine, which was supplemented with 5 mM HEPES, 30 mg/L L-proline, 0.05% BSA, 10 ng/ml epidermal growth factor, insulin-transferrin-serine (ITS)-X, 107 M dexamethasone (Dex), 10 mM nicotinamide, 1 mM ascorbic acid-2 phosphate, an antibiotic/antimycotic solution with or without combinations of the following four small-molecule inhibitors, 10 mM Y-27632, 1 mM PD0325901, 0.5 mM A-83-01, 3 mM CHIR99021','Adult rat hepatocytes were isolated from 10–20-week-old female Wistar rats','Katsuda, T., Kawamata, M., Hagiwara, K., Takahashi, R., Yamamoto, Y., Camargo, F.D. et al. (2017) Conversion of terminally committed hepatocytes to culturable bipotent progenitor cells with regenerative capacity. Cell Stem Cell 20, 41–55, https://doi.org/10.1016/j.stem.2016.10.007',90,'CLiPs repopulate chronically injured liver tissues',NULL,NULL,0,0,0);
/*!40000 ALTER TABLE `MAIN` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `authors`
--

DROP TABLE IF EXISTS `authors`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `authors` (
  `authorId` int(11) NOT NULL AUTO_INCREMENT,
  `author` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `number_of_articles` int(11) DEFAULT NULL,
  PRIMARY KEY (`authorId`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `authors`
--

LOCK TABLES `authors` WRITE;
/*!40000 ALTER TABLE `authors` DISABLE KEYS */;
INSERT INTO `authors` VALUES (1,'John Doe',1),(2,'Mary',1);
/*!40000 ALTER TABLE `authors` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `chemicals`
--

DROP TABLE IF EXISTS `chemicals`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `chemicals` (
  `chemicalInd` int(11) NOT NULL AUTO_INCREMENT,
  `chemicalId` varchar(80) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `chemicalCommon` varchar(150) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`chemicalInd`)
) ENGINE=InnoDB AUTO_INCREMENT=118 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `chemicals`
--

LOCK TABLES `chemicals` WRITE;
/*!40000 ALTER TABLE `chemicals` DISABLE KEYS */;
INSERT INTO `chemicals` VALUES (3,'4521392','SB431542'),(4,'9444','5-aza-CR'),(5,'47936','Forskolin'),(6,'11524144','dorsomorphin'),(7,'4521392','SB431542'),(8,'11524144','dorsomorphin'),(9,'444732','trichostatin A'),(10,'444732','trichostatin A'),(11,'126357','5‐aza‐2 ́‐deoxycytidine'),(12,'123134263','RG‐108'),(13,'','BrcAMP'),(14,'47936','forskolin'),(15,'3758','IBMX'),(16,'4435','Activin'),(17,'5486993','fibroblast growth factor2'),(18,'381126346','bone morphogenetic protein 4'),(19,'','phosphoinositide 3‐kinase inhibition'),(20,'5486993','fibroblast growth factor 10'),(21,'444795','retinoic acid'),(22,'160737017','inhibitor of activin'),(23,'4521392','SB431542'),(24,'9826528','PD0325901'),(25,'9956119','CHIR99021'),(26,'5352062','romidepsin'),(27,'9444','5-Azacytidine'),(28,'4521392','SB431542'),(29,'4521392','SB431542'),(30,'','IWP-4'),(31,'4521392','SB431542'),(32,'25195294','LDN-193189'),(33,'4521392','SB431542'),(34,'11524144','dorsomorphin'),(35,'',''),(36,'9956119','CHIR99021'),(37,'50997747','DMH1'),(38,'4521392','SB431542'),(39,'54670067','Ascorbic acid'),(40,'3137736','IWR1'),(41,'','IWP1'),(42,'4521392','SB431542'),(43,'4521392','SB431542'),(44,'68210102','GSK126'),(45,'','UNC0638'),(46,'9956119','CHIR99021'),(47,'16218924','A83-01'),(48,'','SC1'),(49,'2814138','OAC2'),(50,'448042','Y27632'),(51,'25150857','BIX01294'),(52,'135400486','AS8351'),(53,'','SU16F'),(54,'9797370','JNJ10198409'),(55,'125632','5-aza-cytidine'),(56,'5494425','JAK inhibitor I'),(57,'',''),(58,'9956119','CHIR99021'),(59,'9956119','CHIR99021'),(60,'','PS48'),(61,'176155','SB203580'),(62,'3121','VPA'),(63,'9956119','CHIR99021'),(64,'449054','RepSox'),(65,'3121','VPA'),(66,'25150857','BIX01294'),(67,'702558','RG108'),(68,'9826528','PD0325901'),(69,'9956119','CHIR99021'),(70,'54670067','vitamin C'),(71,'16218924','A83-01'),(72,'46209426','Thiazovivin'),(73,'5284329','Purmorphamine'),(74,'','VPA3121'),(75,'9956119','CHIR99021'),(76,'25195294','LDN193189'),(77,'16218924','A83-01'),(78,'702558','RG108'),(79,'5530','Parnate'),(80,'1560402','SMER28'),(81,'444795','retinoic acid'),(82,'4521392','SB431542'),(83,'135314076','Noggin'),(84,'25195294','LDN193189'),(85,'82146','Bexarotene'),(86,'4521392','SB431542'),(87,'25195294','LDN193189'),(88,'9956119','CHIR99021'),(89,'9956119','RepSox'),(90,'47936','Forskolin'),(91,'VPA','VPA'),(92,'5530','Parnate'),(93,'5289501','TTNPB'),(94,'9848818','Tauroursodeoxycholic acid'),(95,'9956119','CHIR99021'),(96,'16218924','A83-01'),(97,'3121','VPA'),(98,'9956119','CHIR99021'),(99,'449054','RepSox'),(100,'47936','Forskolin'),(101,'5530','Parnate'),(102,'73087','DZNep'),(103,'5289501','TTNPB'),(104,'25150857','Bix01294'),(105,'702558','RG108'),(106,'2303','Bay k 8644'),(107,'4521392','SB431542'),(108,'449054','RepSox'),(109,'47936','Forskolin'),(110,'448042','Y-27632'),(111,'9956119','CHIR99021'),(112,'49969896','TTNPB5289501[bFGF'),(113,'85099134','BMP4'),(114,'4435]','Activin A'),(115,'448042','Y-27632'),(116,'16218924','A83-01'),(117,'9956119','CHIR99021');
/*!40000 ALTER TABLE `chemicals` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `moa`
--

DROP TABLE IF EXISTS `moa`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `moa` (
  `protocolId` int(11) NOT NULL,
  `chemicalInd` int(11) NOT NULL,
  `moa` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`protocolId`,`chemicalInd`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `moa`
--

LOCK TABLES `moa` WRITE;
/*!40000 ALTER TABLE `moa` DISABLE KEYS */;
INSERT INTO `moa` VALUES (1,1,'TGFb Signaling inhibitor'),(4,3,'TGFb Signaling inhibitor'),(5,4,'5-aza-CR exhibits demethylating effect possibly mediated via TET2 protein increased transcription'),(6,5,''),(6,6,''),(7,7,'Inhibitor of SMAD signaling (SMAD2/3 and SMAD3/5/8)'),(7,8,'inhibitor of BMP type I receptors ALK2 ALK3 and ALK6 which block BMP-mediated SMAD1/5/8'),(8,9,'inhibitor of histone deacetylases down-regulation of Blimp1'),(9,10,'inhibitor of histone deacetylation'),(9,11,'5‐aza‐2 ́‐deoxycytidine'),(9,12,'inhibits DNA methyl transferase'),(9,13,'hydrolysis-resistant form of cAMP'),(9,14,'adenylate cyclase activator'),(9,15,'inhibitor of cAMP phosphodiesterases'),(10,16,''),(10,17,''),(10,18,''),(10,19,''),(10,20,''),(10,21,''),(10,22,''),(11,23,'suppression of transforming growth factor-β (TGF-β)'),(11,24,'suppression extracellular signal-regulated kinase (ERK)'),(11,25,'TGF-b inhibitor'),(12,26,'histone deacetylase inhibitor (HDACi)'),(12,27,'cytidine analog that cannot be methylated'),(13,28,'transforming growth factor-beta (TGF-β) inhibitor, ROCK signaling pathway inhibitor'),(14,29,'dual-SMAD inhibition'),(15,30,''),(15,31,''),(15,32,''),(16,33,'transforming growth factor-beta (TGF-β) inhibitor'),(16,34,'inhibitor of BMP type I receptors ALK2, ALK3 and ALK6 which block BMP-mediated SMAD1/5/8'),(17,35,''),(18,36,'GSK3β inhibitor'),(19,37,'BMP-inhibitor'),(19,38,'TGF-β1-pathway specific inhibitor'),(20,39,''),(21,40,'inhibitor of Wnt response 1'),(21,41,'inhibitor of Wnt production 1'),(22,42,'TGF-β inhibitor'),(23,43,'inhibition of transforming growth factor (TGF)-β'),(24,44,'inhibitor of Enhancer of Zeste Homolog 2 (Ezh2)'),(24,45,'dual inhibitor of G9a and GLP'),(25,46,'GSK3 inhibition'),(25,47,'TGFβ inhibition'),(25,48,'Dual inhibition of extracellular signal-regulated kinase 1 and Ras GTPase'),(25,49,'Epigenetic modulation'),(25,50,'Inhibition of Rho-associated coiled coil forming protein serine/threonine kinase'),(25,51,'Histone methyl transferase inhibition'),(25,52,'Epigenetic modulator'),(25,53,'Platelet-derived growth factor receptor (PDGFR)-β  inhibition'),(25,54,'Dual inhibition of PDGFR-α and PDGFR-β'),(26,55,'5-aza-CR exhibits demethylating effect, possibly mediated via TET2 protein increased transcription'),(27,56,'JAK inhibitor I'),(28,57,''),(29,58,'GSK3 inhibitiors'),(30,59,'GSK3 inhibitiors'),(31,60,'neonatal human epidermal keratinocytes (NHEKs)'),(32,61,'MAP kinase inhibitor'),(33,62,'inhibitor of HDACs'),(33,63,'inhibitor of GSK-3 kinases'),(33,64,'inhibitor of TGF-β pathways'),(34,65,'inhibitor of HDACs'),(34,66,'inhibitor of G9a HMTase'),(34,67,'inhibitor of DNA methyltransferase'),(34,68,'inhibitor of MAPK/ERK signaling pathway'),(34,69,'inhibitor of glycogen synthase kinase 3β'),(34,70,'strong inhibitor of ALK4 5 and 7 and only weak inhibitor of ALK1 2 3 and 6'),(35,71,'strong inhibitor of ALK4 5 and 7 and only weak inhibitor of ALK1 2 3 and 6'),(35,72,'ROCK inhibitor'),(35,73,'Sonic hedgehog (Shh) signaling activator'),(35,74,'inhibitor of HDACs'),(36,75,'inhibitor of GSK-3 kinases'),(36,76,'inhibitor of BMP type I receptor ALK2/3'),(36,77,'inhibitor of TGF-b type I receptor ALK4/5/7'),(36,78,'inhibitor of DNA methyltransferase'),(36,79,'histone demethylase inhibitor'),(36,80,'autophagy modulator'),(36,81,'_'),(37,82,'TGF-β inhibitor'),(37,83,'bone morphogenic protein (BMP) inhibitor'),(37,84,'BMP inhibitor'),(38,85,'retinoid X receptor (RXR) agonist'),(39,86,'TGF-β inhibitor'),(39,87,'BMP inhibitor'),(40,88,''),(40,89,''),(40,90,''),(40,91,''),(40,92,''),(40,93,''),(41,94,''),(42,95,''),(42,96,''),(43,97,''),(43,98,''),(43,99,''),(43,100,''),(43,101,''),(43,102,''),(43,103,''),(44,104,''),(44,105,''),(44,106,''),(44,107,''),(45,108,''),(45,109,''),(45,110,''),(45,111,''),(45,112,''),(45,113,''),(45,114,''),(46,115,''),(46,116,''),(46,117,'');
/*!40000 ALTER TABLE `moa` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `protocol_and_user_to_ratings`
--

DROP TABLE IF EXISTS `protocol_and_user_to_ratings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `protocol_and_user_to_ratings` (
  `protocolId` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `rateId` int(11) NOT NULL,
  PRIMARY KEY (`protocolId`,`userId`),
  KEY `pautr_ref_ratings` (`rateId`),
  CONSTRAINT `pautr_ref_ratings` FOREIGN KEY (`rateId`) REFERENCES `ratings` (`rateId`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `protocol_and_user_to_ratings`
--

LOCK TABLES `protocol_and_user_to_ratings` WRITE;
/*!40000 ALTER TABLE `protocol_and_user_to_ratings` DISABLE KEYS */;
INSERT INTO `protocol_and_user_to_ratings` VALUES (4,1,1),(13,1,2);
/*!40000 ALTER TABLE `protocol_and_user_to_ratings` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `protocol_to_authors`
--

DROP TABLE IF EXISTS `protocol_to_authors`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `protocol_to_authors` (
  `protocolId` int(11) NOT NULL,
  `authorId` int(11) NOT NULL,
  PRIMARY KEY (`protocolId`,`authorId`),
  KEY `authorId` (`authorId`),
  CONSTRAINT `protocol_to_authors_ibfk_1` FOREIGN KEY (`protocolId`) REFERENCES `MAIN` (`protocolId`),
  CONSTRAINT `protocol_to_authors_ibfk_2` FOREIGN KEY (`authorId`) REFERENCES `authors` (`authorId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `protocol_to_authors`
--

LOCK TABLES `protocol_to_authors` WRITE;
/*!40000 ALTER TABLE `protocol_to_authors` DISABLE KEYS */;
/*!40000 ALTER TABLE `protocol_to_authors` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `protocol_to_chemicalInd`
--

DROP TABLE IF EXISTS `protocol_to_chemicalInd`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `protocol_to_chemicalInd` (
  `protocolId` int(11) NOT NULL,
  `chemicalInd` int(11) NOT NULL,
  PRIMARY KEY (`protocolId`,`chemicalInd`),
  KEY `chemicalInd` (`chemicalInd`),
  CONSTRAINT `protocol_to_chemicalind_ibfk_1` FOREIGN KEY (`protocolId`) REFERENCES `MAIN` (`protocolId`),
  CONSTRAINT `protocol_to_chemicalind_ibfk_2` FOREIGN KEY (`chemicalInd`) REFERENCES `chemicals` (`chemicalInd`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `protocol_to_chemicalInd`
--

LOCK TABLES `protocol_to_chemicalInd` WRITE;
/*!40000 ALTER TABLE `protocol_to_chemicalInd` DISABLE KEYS */;
INSERT INTO `protocol_to_chemicalInd` VALUES (4,3),(5,4),(6,5),(6,6),(7,7),(7,8),(8,9),(9,10),(9,11),(9,12),(9,13),(9,14),(9,15),(10,16),(10,17),(10,18),(10,19),(10,20),(10,21),(10,22),(11,23),(11,24),(11,25),(12,26),(12,27),(13,28),(14,29),(15,30),(15,31),(15,32),(16,33),(16,34),(17,35),(18,36),(19,37),(19,38),(20,39),(21,40),(21,41),(22,42),(23,43),(24,44),(24,45),(25,46),(25,47),(25,48),(25,49),(25,50),(25,51),(25,52),(25,53),(25,54),(26,55),(27,56),(28,57),(29,58),(30,59),(31,60),(32,61),(33,62),(33,63),(33,64),(34,65),(34,66),(34,67),(34,68),(34,69),(34,70),(35,71),(35,72),(35,73),(35,74),(36,75),(36,76),(36,77),(36,78),(36,79),(36,80),(36,81),(37,82),(37,83),(37,84),(38,85),(39,86),(39,87),(40,88),(40,89),(40,90),(40,91),(40,92),(40,93),(41,94),(42,95),(42,96),(43,97),(43,98),(43,99),(43,100),(43,101),(43,102),(43,103),(44,104),(44,105),(44,106),(44,107),(45,108),(45,109),(45,110),(45,111),(45,112),(45,113),(45,114),(46,115),(46,116),(46,117);
/*!40000 ALTER TABLE `protocol_to_chemicalInd` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `protocol_to_growthFactor`
--

DROP TABLE IF EXISTS `protocol_to_growthFactor`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `protocol_to_growthFactor` (
  `protocolId` int(11) DEFAULT NULL,
  `growthFactor` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  KEY `protocolId` (`protocolId`),
  CONSTRAINT `protocol_to_growthfactor_ibfk_1` FOREIGN KEY (`protocolId`) REFERENCES `MAIN` (`protocolId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `protocol_to_growthFactor`
--

LOCK TABLES `protocol_to_growthFactor` WRITE;
/*!40000 ALTER TABLE `protocol_to_growthFactor` DISABLE KEYS */;
INSERT INTO `protocol_to_growthFactor` VALUES (4,''),(5,'basic fibroblast growth factor'),(6,'FGF2'),(7,'recombinant human bFGF'),(8,'FGF-2'),(9,'NGF'),(9,'NT-3'),(9,'GDNF'),(9,'BDNF'),(10,'FGF4'),(10,'EGF'),(10,'HGF'),(11,'LIF'),(12,''),(13,''),(14,''),(15,'SHH-C24II'),(15,'FGF8b'),(15,'rhGDNF'),(15,'rhBDNF'),(16,'FGF8'),(17,''),(18,'FGF8'),(18,'transforming growth factor β3'),(19,'BDNF'),(19,'recombinant human GDNF'),(19,'recombinanthuman TGFβ-3'),(20,''),(21,'BMP-4'),(22,'keratinocyte growth factor KGF'),(22,'EGF'),(22,'hepatocyte growth factor HGF'),(22,'IGF1'),(23,'human BMP-4'),(23,'human bFGF'),(23,'human activin A'),(23,'human FGF10'),(23,'human FGF7'),(23,'murine EGF'),(23,'human WNT3a'),(23,'BMP-4'),(23,'bFGF'),(23,'VEGF'),(23,'HGF'),(23,'TGFα'),(24,''),(25,'vascular endothelial growth factor'),(26,'basic fibroblast growth factor'),(27,''),(28,'FGF2'),(28,'EGF'),(28,'FGF4'),(28,'SHH'),(28,'FGF8'),(28,'BDNF'),(28,'GDNF'),(29,''),(30,'FGF2'),(30,'TGFβ1'),(30,'IGF1'),(31,''),(32,'IGF-1'),(32,'IR-b'),(33,'EGF'),(33,'bFGF'),(33,'BDNF'),(33,'GDNF'),(33,'IGF'),(34,'EGF'),(34,'bFGF'),(34,'PDGF-AA'),(35,'bFGF'),(35,'EGF'),(35,'BDNF'),(36,'bFGF'),(36,'EGF'),(37,'epidermal growth factor'),(37,'bFGF'),(38,'bFGF'),(39,'TGF-β'),(40,'Tβ-4'),(40,'GDF-11'),(40,'G-CSF'),(40,'NRG1-β1'),(41,''),(42,'fibroblast growth factor 4'),(42,'hepatocyte growth factor'),(42,'epidermal growth factor'),(43,'epidermal growth factor'),(43,'hepatocyte growth factor'),(44,'FGF9'),(45,'HGF'),(45,'bFGF'),(45,'FGF10'),(45,'EGF'),(45,'FGF2'),(45,''),(46,'EGF'),(46,'TGF-β');
/*!40000 ALTER TABLE `protocol_to_growthFactor` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `protocol_to_stressFactor`
--

DROP TABLE IF EXISTS `protocol_to_stressFactor`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `protocol_to_stressFactor` (
  `protocolId` int(11) DEFAULT NULL,
  `stressFactor` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  KEY `protocolId` (`protocolId`),
  CONSTRAINT `protocol_to_stressfactor_ibfk_1` FOREIGN KEY (`protocolId`) REFERENCES `MAIN` (`protocolId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `protocol_to_stressFactor`
--

LOCK TABLES `protocol_to_stressFactor` WRITE;
/*!40000 ALTER TABLE `protocol_to_stressFactor` DISABLE KEYS */;
INSERT INTO `protocol_to_stressFactor` VALUES (4,''),(5,''),(6,''),(7,''),(8,''),(9,''),(10,''),(11,''),(12,''),(13,'induction medium at 39C and 5% CO2'),(14,''),(15,''),(16,''),(17,''),(18,''),(19,''),(20,''),(21,''),(22,''),(23,''),(24,''),(25,''),(26,''),(27,''),(28,''),(29,''),(30,''),(31,''),(32,''),(33,'The KSR medium (15% KSR) with the chemical cocktail for 10 days under 5% O 2 condition (hypoxia)'),(34,''),(35,''),(36,''),(37,''),(38,''),(39,''),(40,''),(41,''),(42,''),(43,''),(44,''),(45,''),(46,'');
/*!40000 ALTER TABLE `protocol_to_stressFactor` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `protocol_to_transcriptionFactor`
--

DROP TABLE IF EXISTS `protocol_to_transcriptionFactor`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `protocol_to_transcriptionFactor` (
  `protocolId` int(11) DEFAULT NULL,
  `transcriptionFactor` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  KEY `protocolId` (`protocolId`),
  CONSTRAINT `protocol_to_transcriptionfactor_ibfk_1` FOREIGN KEY (`protocolId`) REFERENCES `MAIN` (`protocolId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `protocol_to_transcriptionFactor`
--

LOCK TABLES `protocol_to_transcriptionFactor` WRITE;
/*!40000 ALTER TABLE `protocol_to_transcriptionFactor` DISABLE KEYS */;
INSERT INTO `protocol_to_transcriptionFactor` VALUES (4,''),(5,''),(6,''),(7,''),(8,''),(9,''),(10,''),(11,''),(12,''),(13,''),(14,''),(15,''),(16,'OCT4'),(16,'SOX2'),(16,'NANOG'),(16,'LIN28'),(17,'Oct3/4'),(17,'Sox2'),(17,'Klf4'),(17,'c-Myc'),(18,'FoxG1'),(19,'OCT4'),(19,'SOX2'),(19,'KLF4'),(19,'cMYC'),(20,''),(21,'BrachyuryT'),(21,'mesoderm posterior 1 (MESP1)'),(22,'octamer binding protein (OCT)3/4'),(22,'SRY-box containing gene (SOX)2'),(22,'Kruppel-like factor 4 (KLF4)'),(22,'c-MYC'),(23,'SOX17'),(23,'FOXA2'),(24,'Gata4'),(24,'Hand2'),(24,'Tbx5'),(25,''),(26,''),(27,''),(28,'Oct4'),(28,'Sox2'),(28,'Klf4'),(28,'c-Myc induction'),(29,''),(30,''),(31,'4-Oct'),(32,''),(33,''),(34,''),(35,''),(36,''),(37,''),(38,'PRDM16'),(39,''),(40,''),(41,''),(42,'Hnf1α'),(43,'Foxa1'),(43,'Foxa2'),(43,'Foxa3'),(44,''),(45,''),(46,'');
/*!40000 ALTER TABLE `protocol_to_transcriptionFactor` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ratings`
--

DROP TABLE IF EXISTS `ratings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `ratings` (
  `rateId` int(11) NOT NULL AUTO_INCREMENT,
  `rate1` int(11) DEFAULT NULL,
  `rate2` int(11) DEFAULT NULL,
  `rate3` int(11) DEFAULT NULL,
  PRIMARY KEY (`rateId`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ratings`
--

LOCK TABLES `ratings` WRITE;
/*!40000 ALTER TABLE `ratings` DISABLE KEYS */;
INSERT INTO `ratings` VALUES (1,5,5,5),(2,5,5,5);
/*!40000 ALTER TABLE `ratings` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-07-09 19:00:16
